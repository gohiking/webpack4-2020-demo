const { useEslint, useStylelint } = require('./config')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
// const { v4 } = require('internal-ip')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const { resolve } = require('./utils')
const eslint = () => {
  let loaders = []
  if (useEslint) {
    loaders.push({
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: resolve('src'),
      options: {
        failOnError: false
      }
    })
  }
  return loaders
}
const stylelint = () => {
  let plugins = []
  if (useStylelint) {
    plugins.push(
      new StyleLintPlugin({
        files: ['src/sass/*.sass'],
        syntax: 'sass'
      })
    )
  }
  return plugins
}
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    before(app) {
      app.get('/__healthy', (req, res) => {
        res.json({ status: 200, message: 'I\'m healthy' })
      })
    },
    historyApiFallback: true,
    port: 3333,
    hot: true,
    stats: {
      colors: true,
      hash: false,
      chunks: false,
      chunkModules: false,
      children: false
    },
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': ''
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|icon)$/i,
        include: resolve('src/assets/images'),
        exclude: /favicon\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ].concat(eslint())
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ].concat(stylelint()),
  output: {
    publicPath: '/',
    path: resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  }
})
