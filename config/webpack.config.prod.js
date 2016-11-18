const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

const paths = require('./paths');

module.exports = {
  debug: false,
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('libs', 'libs.min-[hash:6].js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      template: paths.templateHtml,
      inject: 'body',
      filename: 'index.html',
    }),
  ],
};
