const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const resolve = dir => {
  return path.resolve(__dirname, dir)
}

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].bundle.js',
    path: resolve('../dist'),
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'] // loader的执行顺序是从上到下，从右到左
      },
      {
        test: /\.js$/,
        use: {
          options: {
            presets: ['@babel/preset-env'] // 将es6转化为es5
          },
          loader: 'babel-loader' // babel-loader 会默认调babel-core
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}