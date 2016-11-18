const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
  debug: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('libs', 'libs.min-[hash:6].js'),
    new HtmlWebpackPlugin({
      template: paths.templateHtml,
      inject: 'body',
      filename: 'index.html',
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
