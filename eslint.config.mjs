import js from "@eslint/js"
import tseslint from "typescript-eslint"
import react from "eslint-plugin-react"
import unicorn from "eslint-plugin-unicorn"
import cypress from "eslint-plugin-cypress"
import prettier from "eslint-config-prettier"

export default [
  // Global ignores
  {
    ignores: ["node_modules/", "public/", ".cache/", ".claude/"],
  },

  // Base JS recommended rules for all files
  js.configs.recommended,

  // TypeScript + React for src/
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["src/**/*.{ts,tsx}"],
  })),
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      react,
      unicorn,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React
      ...react.configs.recommended.rules,
      "react/prop-types": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",

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

  // Cypress tests
  {
    ...cypress.configs.recommended,
    files: ["cypress/**/*.js"],
  },

  // Root JS files (gatsby-config, gatsby-node, cypress.config)
  {
    files: ["*.js", "cypress/plugins/**/*.js", "scripts/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        module: "readonly",
        exports: "writable",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
        console: "readonly",
        Buffer: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
      },
    },
  },

  // Prettier must be last to override conflicting rules
  prettier,
]
