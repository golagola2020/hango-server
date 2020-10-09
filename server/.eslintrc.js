module.exports = {
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'script',
    ecmaFeatures: {
      jsx: false,
    },
  },
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ['node_modules/'],
  rules: {
    'prettier/prettier': 'error',
  },
}
