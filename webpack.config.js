const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// var MiniCssExtractPlugin = require('mini-css-extract-plugin');

const localeEntries = {};
const locales = ['en', 'fr', 'de', 'es', 'ja', 'nl', 'ta', 'zh'];
locales.forEach((locale) => {
	localeEntries[locale] = `./build/${locale}.js`;
});

module.exports = {
	entry: {
		app: './src/index.js',
		...localeEntries
	},

	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
			{
				test: /\.js$/,
				loader: ['babel-loader', 'eslint-loader'],
				exclude: '/node_modules'
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: '@teamsupercell/typings-for-css-modules-loader',
						// options: {
						//
						// }
					},
					{
						loader: "css-loader",
						options: {
							modules: true
						}
					},
					{
						loader: 'sass-loader',
						options: {

						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			excludeChunks: locales
		}),
	],

	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},

	optimization: {
		chunkIds: 'named',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
				}
			}
		}
	},

	devtool: 'source-map'
};