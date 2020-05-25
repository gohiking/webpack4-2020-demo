const { useGzip } = require('./config')
const { assetsPath, resolve } = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')
const os = require('os')

const imageminGifsicle = require('imagemin-gifsicle')
const imageminPngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')
const imageminMozjpeg = require('imagemin-mozjpeg')
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const addPlugins = () => {
  let plugins = []
  if (useGzip) {
    plugins.push(
      new CompressionPlugin()
    )
  }
  return plugins
}

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        include: resolve('src/assets/images'),
        exclude: /favicon\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images',
              name: '[name].[ext]'
            }
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                imageminGifsicle({
                  interlaced: false
                }),
                imageminMozjpeg({
                  progressive: true,
                  arithmetic: false
                }),
                imageminPngquant({
                  floyd: 0.5,
                  speed: 2
                }),
                imageminSvgo({
                  plugins: [
                    { removeTitle: true },
                    { convertPathData: false }
                  ]
                })
              ]
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
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
              publicPath(url) {
                return '../fonts/' + url
              }
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
              outputPath: 'assets/video',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: os.cpus().length,
        cache: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          },
          output: {
            beautify: false,
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        assetsNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          safe: true,
          discardComments: {
            removeAll: true
          }
        }
      })
    ],
    removeEmptyChunks: true,
    mergeDuplicateChunks: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanWebpackPlugin(['dist'], {
      root: resolve('/'),
      verbose: true,
      dry: false
    }),
    new MiniCssExtractPlugin({
      filename: assetsPath('./css/[name].css')
    })
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: true
    // }),
    // new WorkboxWebpackPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   exclude: [/\.map$/]
    // })
  ].concat(addPlugins()),
  output: {
    path: resolve('dist'),
    filename: assetsPath('./js/[name].js'),
    chunkFilename: assetsPath('./js/[name].js')
  }
})
