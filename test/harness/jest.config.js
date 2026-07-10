/* Separate from the root jest config (which has rootDir: src and only runs unit specs). Scoped
 * to scenarios/ so helpers alongside them are never picked up as test files. */
module.exports = {
  rootDir: __dirname,
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: 'scenarios/.*\\.e2e\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  globalSetup: '<rootDir>/global-setup.ts',
  globalTeardown: '<rootDir>/global-teardown.ts',
  /* One shared database and one shared event stream: scenarios must not race each other. */
  maxWorkers: 1,
  testTimeout: 60_000,
  verbose: true,
}
