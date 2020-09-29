const base = require('./webpack.base')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const path = require('path')
const { node } = require('./webpack.client')
const resolve = dir => {
  return path.resolve(__dirname, dir)
}

module.exports = merge(base, {
  entry: {
    server: resolve('../src/server-entry.js'),
  },
  output: {
    libraryTarget: 'commonjs2', // 打包出来按照module.exports方式
  },
  target: 'node', // 服务端打出来的文件是要给node服务用的
  plugins: [
    new VueSSRServerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: resolve('../public/index.ssr.html'),
      minify: false, // 不压缩，这样打包的时候就不会把ssr的注释标记给删掉。默认打出来的文件index.html
      excludeChunks: ['server'], // 排除引入文件
    }),
  ]
})