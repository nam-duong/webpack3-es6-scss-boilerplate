const path = require('path');
//Extract text from a bundle, or bundles, into a separate file.
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
//If you have any CSS assets in webpack's output (for example, CSS extracted with the ExtractTextPlugin) then these will be included with <link> tags in the HTML head.
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: true
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    HtmlWebpackPluginConfig,
    new DashboardPlugin(),
    new CopyWebpackPlugin([{
      from: 'assets',
      to: ''
    }])
  ]
};