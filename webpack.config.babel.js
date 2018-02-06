import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader', exclude: /node_modules/},
      { test: /\.css$/, use: ['style-loader', 'css-loader'], exclude: /node_modules/}
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })]
}
