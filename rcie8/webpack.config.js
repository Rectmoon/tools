const path = require('path')
const ROOT = path.resolve(__dirname, './')
const ENV = process.env.NODE_ENV
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const isDev = ENV === 'development'

module.exports = {
  mode: ENV || 'production',
  devtool: isDev ? 'source-map' : undefined,
  context: ROOT,
  entry: `${ROOT}/src/index.js`,
  output: {
    path: `${ROOT}/dist`,
    filename: 'index.js'
  },
  resolve: {
    alias: {
      react: 'anujs/dist/ReactIE',
      'react-dom': 'anujs/dist/ReactIE',
      'prop-types': 'anujs/lib/ReactPropTypes',
      'create-react-class': 'anujs/lib/createClass',
      '@reach/router': `${ROOT}/patches/Router`,
      redux: `${ROOT}/patches/redux`,
      '@rematch/core': 'anujs/dist/Rematch'
      // antd: `${ROOT}/patches/antd`
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-_-[hash:base64]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: true
        }
      })
    ]
  },
  plugins: [
    ENV === 'production' &&
      new CleanWebpackPlugin(['dist'], {
        root: ROOT,
        verbose: true,
        dry: false
      }),

    new DllReferencePlugin({
      context: ROOT,
      manifest: path.resolve(__dirname, 'src/base.manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: `${ROOT}/src/index.html`
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: true,
        compress: false,
        mangle: false,
        output: { beautify: true }
      }
    }),
    new CopyWebpackPlugin(
      [
        {
          context: ROOT,
          from: 'src/static',
          to: 'static'
        }
      ],
      {}
    )
  ],
  devServer: {
    contentBase: isDev ? undefined : `${ROOT}/dist`
  }
}
