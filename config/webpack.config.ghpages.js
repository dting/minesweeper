const webpackMerge = require('webpack-merge');
const path = require('path');

module.exports = webpackMerge(require(path.resolve('config', 'webpack.config.prod.js')), {
  output: {
    publicPath: '/minesweeper/',
  },
});
