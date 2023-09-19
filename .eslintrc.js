module.exports = {
  plugins: ["tailwindcss", "unused-imports"],
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    "react/jsx-boolean-value": "error",
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never" },
    ],
    "react/jsx-no-useless-fragment": "error",
    "tailwindcss/classnames-order": ["error"],
    "tailwindcss/no-contradicting-classname": "error",
    "tailwindcss/migration-from-tailwind-2": "error",
    "tailwindcss/enforces-shorthand": "error",
    "import/no-cycle": "error",
    "unused-imports/no-unused-imports": "error",
    "import/order": [
      "error",
      {
        groups: ["type", ["builtin", "external"], "parent", "sibling", "index"],
        alphabetize: {
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
  },
};
