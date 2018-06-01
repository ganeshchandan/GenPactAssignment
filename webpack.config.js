var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer      = require('autoprefixer-core');
var csswring          = require('csswring');
var webpack           = require('webpack');
var path              = require('path');
var fs                = require('fs');

var config = {
  entry: ['webpack/hot/dev-server', './src/scripts/App.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  eslint: {
    reporter: require("eslint-friendly-formatter"),
    // reporter: require("eslint/lib/formatters/stylish")
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel', 'eslint'],
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      loader: 'style!css!postcss!sass'
    }, {
      test: /\.woff$|\.ttf$|\.wav$|\.mp3$/,
      loader: 'file'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template_index.html',
      inject: 'body' // Inject all scripts into the body
    })
  ],
  postcss: [autoprefixer, csswring],
  devtool: 'eval'
  // devtool: 'sourcemap'
};

module.exports = config;
