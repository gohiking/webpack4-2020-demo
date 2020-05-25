const { useJquery, useCoffee } = require('./config')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const PreloadWebpackPlugin = require('preload-webpack-plugin')
const HtmlWebpackIncludeSiblingChunksPlugin = require('html-webpack-include-sibling-chunks-plugin')
const glob = require('glob')
const { assetFuncs, resolve } = require('./utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const HappyPack = require('happypack')
// const os = require('os')
// const ManifestPlugin = require('webpack-manifest-plugin')
require('dotenv').config()

// eslint-disable-next-line
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const entries = glob.sync('./src/pages/**.pug')
const htmlPlugins = []
let entry = {}
entries.forEach(path => {
  const chunkName = path.slice('./src/pages/'.length, -'.pug'.length)
  htmlPlugins.push(
    new HtmlWebpackPlugin({
      template: path,
      filename: chunkName + '.html',
      chunks: ['vendors', 'vendor-commons', chunkName],
      minify: {
        removeRedundantAttributes: true,
        collapseWhitespace: false,
        removeAttributeQuotes: false,
        removeComments: true,
        collapseBooleanAttributes: true
      }
    })
  )
  entry[chunkName] = [
    '@babel/polyfill',
    './src/scripts/pages/' + chunkName + '.js'
  ]
})
const rules = () => {
  let loaders = []
  if (useCoffee) {
    loaders.push({
      test: /\.coffee$/,
      use: [
        {
          loader: 'coffee-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    })
  }
  if (useJquery) {
    loaders.push({
      test: require.resolve('jquery'),
      use: [
        {
          loader: 'expose-loader',
          options: '$'
        },
        {
          loader: 'expose-loader',
          options: 'jQuery'
        }
      ]
    })
  }
  return loaders
}

module.exports = {
  entry: entry,
  resolve: {
    extensions: ['.js', '.vue', '.coffee'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '~': resolve('src'),
      '@': resolve('src'),
      assets: resolve('src/assets'),
      images: resolve('src/assets/images'),
      scripts: resolve('src/scripts'),
      sass: resolve('src/sass'),
      '@vue': resolve('src/vue')
    },
    modules: [resolve('src'), resolve('node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules\/(?!(dom7|swiper|ansi-regex|strip-ansi)\/).*/
      },
      {
        test: /\.html$/,
        include: resolve('src'),
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.pug$/,
        include: resolve('src'),
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          {
            use: [
              'raw-loader',
              'extract-loader',
              {
                loader: 'html-loader',
                options: {
                  root: resolve('src'),
                  attrs: ['img:src']
                }
              },
              {
                loader: 'pug-plain-loader',
                options: {
                  pretty: true,
                  exports: false,
                  data: {
                    ga: process.env.GA
                  }
                }
              }
            ]
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: resolve('src/vue'),
        use: [
          {
            loader: 'css-hot-loader'
          },
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')({
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              functions: assetFuncs
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [resolve('src/sass/mixins.sass')]
            }
          }
        ]
      },
      {
        test: /\.sass?$/,
        include: resolve('src/vue'),
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')({
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              functions: assetFuncs
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [resolve('src/sass/mixins.sass')]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /favicon\.png$/,
        include: resolve('src/static'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ].concat(rules())
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](.*)\.js/,
          name: 'vendor',
          chunks: 'all',
          priority: 2,
          enforce: true
        },
        vendorModules: {
          name: 'vendor-modules',
          chunks: 'initial',
          minChunks: 2,
          minSize: 0,
          priority: 1,
          maxInitialRequests: 5,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackBar({
      color: 'green',
      profile: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // new HappyPack({
    //   id: 'babel',
    //   loaders: [
    //     {
    //       loader: 'babel-loader'
    //     }
    //   ],
    //   threadPool: happyThreadPool,
    //   verbose: true
    // }),
    // new ManifestPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackIncludeSiblingChunksPlugin(),
    ...htmlPlugins,
    // new PreloadWebpackPlugin({
    //   rel: 'preload',
    //   include: 'initial',
    //   as(entry) {
    //     if (/\.css$/.test(entry)) return 'style'
    //     if (/\.(woff|woff2)$/.test(entry)) return 'font'
    //     if (/\.(png|jpg)$/.test(entry)) return 'image'
    //     return 'script'
    //   }
    // }),
    new CopyWebpackPlugin([
      {
        from: './src/static'
      },
      {
        from: './node_modules/pace-progress/pace.min.js',
        to: 'assets/js/pace.min.js'
      }
    ])
  ]
}
