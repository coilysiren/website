import js from "@eslint/js"
import tseslint from "typescript-eslint"
import unicorn from "eslint-plugin-unicorn"
import cypress from "eslint-plugin-cypress"
import prettier from "eslint-config-prettier"
import globals from "globals"

export default [
  // Global ignores
  {
    ignores: ["node_modules/", ".pnpm-store/", "dist/", ".claude/"],
  },

  // JavaScript configuration, data, and build scripts
  {
    ...js.configs.recommended,
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      globals: globals.node,
    },
  },

  // TypeScript across application, build, scripts, and tests
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
  })),

  // TypeScript source and unit tests
  {
    files: ["src/**/*.ts"],
    plugins: {
      unicorn,
    },
    rules: {
      // Unicorn
      "unicorn/filename-case": "error",
      "unicorn/catch-error-name": "error",
      "unicorn/consistent-function-scoping": "error",
      "unicorn/error-message": "error",
      "unicorn/escape-case": "error",
      "unicorn/expiring-todo-comments": "error",
      "unicorn/explicit-length-check": "error",
      "unicorn/new-for-builtins": "error",
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/no-instanceof-array": "error",
      "unicorn/no-console-spaces": "error",
      "unicorn/no-for-loop": "error",
      "unicorn/no-hex-escape": "error",
      "no-nested-ternary": "off",
      "unicorn/no-nested-ternary": "error",
      "unicorn/no-new-buffer": "error",
      "unicorn/no-process-exit": "error",
      "unicorn/no-unreadable-array-destructuring": "error",
      "unicorn/no-zero-fractions": "error",
      "unicorn/number-literal-case": "error",
      "unicorn/prefer-add-event-listener": "error",
      "unicorn/prefer-keyboard-event-key": "error",
      "unicorn/prefer-math-trunc": "error",
      "unicorn/prefer-array-flat-map": "error",
      "unicorn/prefer-includes": "error",
      "unicorn/prefer-negative-index": "error",
      "unicorn/prefer-dom-node-append": "error",
      "unicorn/prefer-dom-node-remove": "error",
      "unicorn/prefer-query-selector": "error",
      "unicorn/prefer-reflect-apply": "error",
      "unicorn/prefer-spread": "error",
      "unicorn/prefer-string-starts-ends-with": "error",
      "unicorn/prefer-string-slice": "error",
      "unicorn/prefer-dom-node-text-content": "error",
      "unicorn/prefer-string-trim-start-end": "error",
      "unicorn/prefer-type-error": "error",
      "unicorn/better-regex": "error",
      "unicorn/throw-new-error": "error",
    },
  },

  // Scripts served to the browser. Everything else under this config is Node,
  // so these need the browser globals declared rather than assumed.
  {
    files: ["static/**/*.js"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // Cypress tests
  {
    ...cypress.configs.recommended,
    files: ["cypress/**/*.ts"],
    languageOptions: {
      ...cypress.configs.recommended.languageOptions,
      globals: {
        ...cypress.configs.recommended.languageOptions?.globals,
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Prettier must be last to override conflicting rules
  prettier,
]
