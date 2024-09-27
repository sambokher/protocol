import globals from "globals";
import eslintJS from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  eslintJS.configs.recommended,
  ...typescriptEslint.configs.recommended,
  eslintPluginReact.configs.flat["jsx-runtime"],
  {
    rules: {
      "prefer-const": 1,
      "eqeqeq": 1,
      "no-unused-expressions: 1
    },
  },
];
