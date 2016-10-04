'use strict';
// jscs:disable
/* global __dirname */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const node_modules = path.join(__dirname, '../../node_modules');
const distPath = path.join(__dirname, '../dist');

module.exports = {
	devtool: false,
	entry: {
		app: path.resolve(__dirname, '../src/main.js')
	},

	output: {
		path: distPath,
		publicPath: '/',
		filename: 'static/scripts/[name].[chunkhash].js',
		chunkFilename: 'static/scripts/[id].[chunkhash].js'
	},

	resolve: {
		extensions: ['', '.js'],
		fallback: [node_modules],
		alias: {
			'actions': path.resolve(__dirname, '../src/actions'),
			'reducers': path.resolve(__dirname, '../src/modules'),
			'styles': path.resolve(__dirname, '../src/styles'),
			'utils': path.resolve(__dirname, '../src/utils'),
			'views': path.resolve(__dirname, '../src/views')
		}
	},

	resolveLoader: {
		fallback: [node_modules]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"'+process.env.NODE_ENV+'"'
		}),
		new webpack.ProvidePlugin({
			'React': 'react'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		// extract css into its own file
		new ExtractTextPlugin('static/styles/[name].[contenthash].css'),
		// generate dist index.html with correct asset hash for caching.
		// you can customize output by editing /index.html
		// see https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: distPath + '/index.html',
			template: path.resolve(__dirname, '../index.html'),
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		}),
		// split vendor js into its own file
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module, count) {
				// any required modules inside node_modules are extracted to vendor
				return (
						module.resource &&
						/\.js$/.test(module.resource) &&
						module.resource.indexOf(
								path.resolve(__dirname, '../../node_modules')
						) === 0
				);
			}
		}),
		// extract webpack runtime and module manifest to its own file in order to
		// prevent vendor hash from being updated whenever app bundle is updated
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		})
	],

	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0',
			include: path.join(__dirname, '../src')
		}, {
			// stylus loader
			test: /\.styl$/,
//			loaders: ['style', 'css', 'stylus']
			loader: ExtractTextPlugin.extract('style', 'css!stylus')
		},  {
			// image loader
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192' // <= 8kb的图片base64内联
		}, {
			// iconfont loader
			test : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			loader : 'file'
		}]
	}
};