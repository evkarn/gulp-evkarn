import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
	{
		extends: [
			'eslint:recommended',
			'plugin:prettier/recommended',
		]
	},
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
	{
		rules: {
			'no-var': 'warn',
			'prefers-const': 'warn',
			'prettier/prettier': [
				'warn',
				{
					endOfLine: 'auto',
				}
			]
		},
	},
]);