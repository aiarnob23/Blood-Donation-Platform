import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.recommended,

  // Disable TypeScript errors from being warnings
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Turns off unused variable warnings
      "@typescript-eslint/explicit-module-boundary-types": "off", // Disables explicit return type warnings
      "@typescript-eslint/no-explicit-any": "off", // Allows `any` type usage without warnings
    },
  },
];
