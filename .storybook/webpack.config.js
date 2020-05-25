const path = require('path')
const include = path.resolve(__dirname, '../')
const assetFunctions = require('node-sass-asset-functions')
const assetFuncs = assetFunctions({
  images_path: './src/assets/images',
  http_images_path: '../assets/images'
})
module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.sass', '.scss'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '~': path.resolve(__dirname, '../src'),
      '@': path.resolve(__dirname, '../src'),
      assets: path.resolve(__dirname, '../src/assets'),
      images: path.resolve(__dirname, '../src/assets/images'),
      scripts: path.resolve(__dirname, '../src/scripts'),
      sass: path.resolve(__dirname, '../src/sass'),
      '@vue': path.resolve(__dirname, '../src/vue'),
      'animation.gsap': path.resolve(__dirname, '../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js')
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include
      },
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, '../src'),
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
                  root: path.resolve(__dirname, '../src'),
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: path.resolve(__dirname, '../src/vue'),
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
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
              resources: [path.resolve(__dirname, '../src/sass/mixins.sass')]
            }
          }
        ]
      },
      {
        test: /\.sass?$/,
        include: path.resolve(__dirname, '../src/vue'),
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2
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
              sourceMap: true
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname, '../src/sass/mixins.sass')]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'file-loader',
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.(png|jpg|jpeg|icon)$/i,
        include: path.resolve(__dirname, '../src/assets/images'),
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
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
      },
      {
        resourceQuery: /blockType=docs/,
        use: ['storybook-readme/vue/docs-loader', 'html-loader', 'markdown-loader'],
      }
    ]
  }
}
