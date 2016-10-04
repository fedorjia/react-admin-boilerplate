'use strict';

// https://github.com/shelljs/shelljs
require('shelljs/global');

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');

const assetsPath = path.join(__dirname, '../dist/static');
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', path.resolve(__dirname, '../static/*'), assetsPath);

webpack(webpackConfig, function (err, stats) {
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
});
