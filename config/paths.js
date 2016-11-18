const path = require('path');

const srcDir = path.resolve('src');

module.exports = {
  srcDir,
  buildDir: path.resolve('build'),
  polyfillJs: path.resolve('config', 'polyfill.js'),
  mainJs: path.resolve(srcDir, 'main.js'),
  templateHtml: path.resolve(srcDir, 'index.tpl.html'),
};
