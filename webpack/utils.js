'use strict'

const path = require('path')
const assetFunctions = require('node-sass-asset-functions')
const assetFuncs = assetFunctions({
  images_path: './src/assets/images',
  http_images_path: '../assets/images'
})
const assetsPath = function(_path) {
  const assetsSubDirectory = 'assets'
  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
  resolve(dir) {
    return path.resolve(__dirname, '../' + dir)
  },
  assetFuncs,
  assetsPath
}
