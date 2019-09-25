const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/react'
  ],
  plugins: [
    isDev && 'react-hot-loader/babel',
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties']
  ].filter(Boolean)
}
