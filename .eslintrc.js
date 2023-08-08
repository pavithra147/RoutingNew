module.exports = {
    root: true,
    ignorePatterns: ['node_modules/', 'dist/', 'e2e/'],
    overrides: [
      {
        files: ['*.ts'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          project: 'tsconfig.json',
          sourceType: 'module',
        },
        plugins: ['@typescript-eslint', '@angular-eslint'],
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:@angular-eslint/recommended',
        ],
        rules: {
          // Customize ESLint rules as needed
        },
      },
      {
        files: ['*.html'],
        parser: '@angular-eslint/template-parser',
        plugins: ['@angular-eslint/template'],
        extends: ['plugin:@angular-eslint/template/recommended'],
      },
    ],
  };
  