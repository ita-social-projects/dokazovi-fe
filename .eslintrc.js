module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  plugins: ["@typescript-eslint", "import", "jsx-a11y", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    /* Disable any eslint formatting rules to avoid conflicts */
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  rules: {
    "@typescript-eslint/no-empty-interface": [
      "warn",
      {
        allowSingleExtends: false,
      },
    ],
    semi: ["error", "always"],
    "react/prop-types": [1],
  },
};
