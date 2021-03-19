module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  root: true,
  extends: ['plugin:@typescript-eslint/recommended', 'standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint/eslint-plugin', '@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'comma-dangle': 'off',
    'no-useless-constructor': 'off'
  }
}
