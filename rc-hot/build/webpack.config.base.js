const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { resolve, assetsPath, getEntries, getHtmlPlugins } = require('./utils')
const config = require('./config')

const ENV = process.env.NODE_ENV
const isDev = ENV === 'development'

const globalCssHandlers = [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']

const localCssHandlers = globalCssHandlers.map((handler, i) =>
  i == 1
    ? {
        loader: 'css-loader',
        options: {
          modules: {
            mode: 'local',
            localIdentName: isDev ? '[path][name]__[local]' : '[name]--[hash:base64:5]',
            context: resolve(__dirname, 'src')
          }
        }
      }
    : handler
)

module.exports = {
  entry: getEntries(),

  output: {
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.jsx'],

    alias: {
      '@': resolve('src')
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },

      {
        test: /\.css$/,
        include: [/node_modules/, resolve('src/assets/styles')],
        use: [...globalCssHandlers]
      },

      {
        test: /\.css$/,
        exclude: [/node_modules/, resolve('src/assets/styles')],
        use: [...localCssHandlers]
      },

      {
        test: /\.styl(us)?$/,
        include: [/node_modules/, resolve('src/assets/styles')],
        use: [...globalCssHandlers, 'stylus-loader']
      },

      {
        test: /\.styl(us)?$/,
        exclude: [/node_modules/, resolve('src/assets/styles')],
        use: [...localCssHandlers, 'stylus-loader']
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf|htc)$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 4096,
            name: assetsPath('fonts/[name].[hash:6].[ext]')
          }
        }
      },

      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: assetsPath('images/[name].[hash:6].[ext]')
        }
      }
    ]
  },

  plugins: [
    ...getHtmlPlugins(),

    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: config.assetsSubDirectory,
        ignore: ['.*', '*_manifest.json']
      }
    ]),

    new webpack.DefinePlugin({
      'process.env': `${JSON.stringify(ENV)}`
    }),

    new webpack.ProgressPlugin()
  ]
}
