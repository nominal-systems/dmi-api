import { ChildProcess, spawn } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import * as path from 'path'
import { appEnv, env } from './env'

/* Lifecycle for the app under test. It runs on the host, against containerised dependencies —
 * containerising dmi-api itself would mean building its image (which needs GHP_TOKEN) on every
 * run, for no extra coverage.
 *
 * `node dist/main` rather than `npm run start`: `nest start` forks a child, and killing a process
 * tree portably (Windows especially) is a reliable source of orphaned servers holding the port. */

const isWindows = process.platform === 'win32'

async function buildApp (): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(isWindows ? 'npm.cmd' : 'npm', ['run', 'build'], {
      cwd: env.repoRoot,
      stdio: 'inherit',
      shell: isWindows,
      timeout: 600_000,
    })
    child.on('error', reject)
    child.on('close', (code) => {
      code === 0 ? resolve() : reject(new Error(`npm run build exited with code ${String(code)}`))
    })
  })
}

/* registerStaticAssets points @fastify/static at <repo>/public, which is absent from a clean
 * checkout — the Admin UI is built into it by the release workflow. Without this the app throws
 * on boot. Creating the directory is exactly what build-and-push-to-registry.yml does. */
function ensurePublicDir (): void {
  const publicDir = path.join(env.repoRoot, 'public')
  if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true })
}

export async function waitForHealth (
  timeoutMs: number,
  app?: ChildProcess,
  spawnError?: () => Error | undefined,
): Promise<void> {
  const deadline = Date.now() + timeoutMs
  let lastError: unknown
  while (Date.now() < deadline) {
    const failure = spawnError?.()
    if (failure != null) throw failure
    if (app?.exitCode != null) {
      throw new Error(`App exited with code ${app.exitCode} before becoming healthy`)
    }
    try {
      const response = await fetch(`${env.baseUrl}/health`, { signal: AbortSignal.timeout(5000) })
      if (response.ok) return
      lastError = new Error(`HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`)
    } catch (error) {
      lastError = error
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  throw new Error(`App at ${env.baseUrl} not healthy within ${timeoutMs}ms: ${String(lastError)}`)
}

export async function startApp (): Promise<ChildProcess> {
  ensurePublicDir()
  if (env.build) await buildApp()

  const entrypoint = path.join(env.repoRoot, 'dist', 'main.js')
  if (!existsSync(entrypoint)) {
    throw new Error(`${entrypoint} not found. Run 'npm run build', or unset HARNESS_BUILD=0.`)
  }

  const app = spawn(process.execPath, [entrypoint], {
    cwd: env.repoRoot,
    env: appEnv(),
    stdio: ['ignore', 'inherit', 'inherit'],
  })

  /* Throwing from an 'error' listener would surface as an uncaught exception in Jest's
   * globalSetup, losing the cause. Stash it and let waitForHealth report it. */
  let spawnError: Error | undefined
  app.on('error', (error) => {
    spawnError = error
  })

  await waitForHealth(env.timeouts.appReadyMs, app, () => spawnError)
  return app
}

export async function stopApp (app: ChildProcess): Promise<void> {
  if (app.exitCode != null || app.signalCode != null) return
  await new Promise<void>((resolve) => {
    app.once('close', () => resolve())

    /* The process may have exited between the guard above and the listener above, in which case
     * 'close' has already fired and will not fire again. */
    if (app.exitCode != null || app.signalCode != null) {
      resolve()
      return
    }

    /* SIGTERM is not really supported on Windows; Node maps kill() onto TerminateProcess. That is
     * fine here because a single `node dist/main` has no children to orphan. */
    app.kill('SIGTERM')
    setTimeout(() => {
      if (app.exitCode == null) app.kill('SIGKILL')
    }, 10_000).unref()
  })
}
