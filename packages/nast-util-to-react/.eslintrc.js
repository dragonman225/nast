const path = require('path')

module.exports = {
  root: true,
  env: {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "jsx": true
    },
    "project": path.join(__dirname, 'tsconfig.json'),
    "sourceType": "module"
  },
  plugins: [
    "react",
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "no-console": "off",
    "linebreak-style": [
      "error",
      "unix"
    ],
    /** quotes not working */
    "quotes": [
      "error",
      "single"
    ],
    /** semi not working */
    "semi": "off",
    "@typescript-eslint/semi": [
      "error",
      "never"
    ],
    /** indent not working */
    "indent": "off",
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        "functions": false,
        "classes": true
      }
    ],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "none",
          "requireLast": false
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        }
      }
    ]
  },
  overrides: [
    {
      "files": [
        "*.js"
      ],
      "rules": {
        "@typescript-eslint/no-var-requires": "off"
      }
    }
  ]
}