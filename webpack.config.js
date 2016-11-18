const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('./config/paths');
const pkg = require('./package.json');

const common = {
  context: paths.srcDir,
  entry: {
    app: [
      paths.polyfillJs,
      paths.mainJs,
    ],
    libs: Object.keys(pkg.dependencies),
  },
  output: {
    path: paths.buildDir,
    filename: 'bundle.min-[hash:6].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.css', '.scss'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
    }, {
      test: /\.scss$/,
      loaders: [
        ExtractTextPlugin.extract('style'),
        'css?sourceMap',
        'postcss',
        'sass?sourceMap',
      ],
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'url?prefix=font/&limit=5000',
    }, {
      test: /\.(png|jpg|jpeg|gif|woff)$/,
      loader: 'url-loader?limit=8192',
    }],
  },
  postcss: () => [postcssImport, autoprefixer],
};

switch (process.env.NODE_ENV) {
  case 'production':
    if (process.env.DEPLOY_TARGET === 'ghpages') {
      module.exports = webpackMerge(common, require('./config/webpack.config.ghpages'));
    } else {
      module.exports = webpackMerge(common, require('./config/webpack.config.prod'));
    }
    break;
  default:
    module.exports = webpackMerge(common, require('./config/webpack.config.dev'));
    break;
}
