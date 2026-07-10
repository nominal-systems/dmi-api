module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  root: true,
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint/eslint-plugin', '@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js', 'migrations', 'dist'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true
    }]
  },
  overrides: [
    {
      // The integration harness is a black box: it talks to a running dmi-api over HTTP and, for
      // setup only, to MySQL over mysql2. Importing from src/ would couple it to internals it
      // exists to test from the outside. See test/harness/README.md.
      files: ['test/harness/**/*.ts'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [{
            group: ['**/src/*', '**/src/**', '../../src/*', '../../../src/*'],
            message: 'The harness must not import from dmi-api src/ — it is a black-box suite.'
          }]
        }]
      }
    }
  ]
}
