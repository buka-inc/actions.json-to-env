const buka = require('@buka/eslint-config')
const globals = require('globals')


module.exports = [
  {
    ignores: ['dist'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...buka.js.recommended,
]
