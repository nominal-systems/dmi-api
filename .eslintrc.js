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
    '@typescript-eslint/consistent-type-assertions': 'off'
  }
}
