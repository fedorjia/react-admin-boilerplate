'use strict';
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf.js');
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
});

const hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
	compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
		hotMiddleware.publish({action: 'reload'});
		cb();
	});
});

/***
 * app use middlewares
 */
exports.use = function (app) {
	// handle fallback for HTML5 history API
	app.use(require('connect-history-api-fallback')());
	// serve webpack bundle output
	app.use(devMiddleware);
	// enable hot-reload and state-preserving
	app.use(hotMiddleware);
};