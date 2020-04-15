module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 1,
    'no-case-declarations': 0,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
};
