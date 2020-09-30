const base = require('./webpack.base')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const path = require('path')
const resolve = dir => {
  return path.resolve(__dirname, dir)
}

module.exports = merge(base, {
  entry: {
    client: resolve('../src/client-entry.js')
  },
  plugins: [
    new VueSSRClientPlugin(), // 打包出来的是一个映射json文件,不需要写死引入client.bundle.js,打包出来的名字不是固定的
    // 客户端打包不需要html,因为用的是服务端打包出来的ssr.html
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html')
    }),
  ]
})