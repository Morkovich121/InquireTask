module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    },
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    plugins: [
      "react",
      "react-hooks",
      "@typescript-eslint"
    ],
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    rules: {
      // здесь можно добавить правила линтера
    }
  };
  