module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard'
  ],
  plugins: [
    'react'
  ],
  'env': {
    'browser': true
  },
  'rules': {
    "no-trailing-spaces": "off",
    'arrow-parens': 'off',
    'generator-star-spacing': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-danger': 'off',
    'react/no-unused-prop-types': 'off',
    'react/require-extension': 'off',
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/react-in-jsx-scope': 'warn'
  }
}
