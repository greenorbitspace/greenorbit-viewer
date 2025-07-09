import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  {
    ignores: ["node_modules/**", "build/**", "wwwroot/build/**"], // ignore folders

    languageOptions: {
      globals: {
        // Define globals based on env: browser, node, es2021
        window: "readonly",
        document: "readonly",
        console: "readonly",
        module: "readonly",
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        Buffer: "readonly"
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin
    },

    rules: {
      "no-unused-vars": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },

    settings: {
      react: {
        version: "detect"
      }
    },

    linterOptions: {
      reportUnusedDisableDirectives: "error"
    }
  }
];