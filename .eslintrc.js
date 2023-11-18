module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Add node environment as needed
  },
  extends: ['airbnb-base', 'plugin:react/recommended'],
  parser: '@babel/eslint-parser', // Use Babel parser for parsing JSX
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'], // Add React plugin
  rules: {
    // Add specific rules or overrides as needed
  },
};
