import { fileURLToPath, URL } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import { flatConfigs as importPlugin } from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { configs as tseslintConfigs } from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default [
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslintConfigs.recommended,
  importPlugin.recommended,
  importPlugin.typescript,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "simple-import-sort/imports": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
  {
    ignores: ["**/build/**", "**/dist/**"],
  },
];
