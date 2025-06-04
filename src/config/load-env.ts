import { config } from 'dotenv'
import { existsSync } from 'fs'

export function loadEnv (): string[] {
  const envFiles: string[] = []
  if (process.env.NODE_ENV) {
    envFiles.push(`.env.${process.env.NODE_ENV}`)
  }
  envFiles.push('.env')

  const loaded: string[] = []
  for (const file of envFiles) {
    if (existsSync(file)) {
      config({ path: file })
      loaded.push(file)
    }
  }
  return loaded
}
