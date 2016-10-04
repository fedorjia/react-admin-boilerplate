'use strict';

/* global __dirname */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const node_modules = path.join(__dirname, '../../node_modules');

const config = {
	devtool: '#eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./webapp/src/main'
	],

	resolve: {
		extensions: ['', '.js', 'css', 'styl'],
		alias: {
			'redux' : path.join(node_modules, 'redux/dist/redux.min'),
			'react-redux' : path.join(node_modules, 'react-redux/dist/react-redux.min'),
			'react-form' : path.join(node_modules, 'react-form/dist/redux-form.min'),
			'normalizr': path.join(node_modules, 'normalizr/dist/normalizr.min'),
			'immutable': path.join(node_modules, 'immutable/dist/immutable.min')
		}
	},

	output: {
		path: path.join(__dirname, '../dist'),
		filename: '[name].js',
		publicPath: '/'
	},

	module: {
		noParse: [ ],
		loaders: [{
			// js loader
			test: /\.js$/, 
			loaders: ['babel?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0', 'react-hmre']})], 
			include: path.join(__dirname, '../src')
		}, {
			// stylus loader
			test: /\.styl/, 
			loaders: ['style', 'css', 'autoprefixer', 'stylus']
		},  {
			// image loader
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192' // <= 8kb的图片base64内联
		}, {
			// iconfont loader
			test : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			loader : 'file'
		}]
	},

	// html中引入CDN，此处指向外部
	externals: {
//		'react': 'React'
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development') // production, development
		}),
		new webpack.ProvidePlugin({
			'React': 'react' // 提取react，减少代码中重复 "import React from react"
		}),

		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, '../index.html'),
			inject: true
		})
	]
};

module.exports = config;