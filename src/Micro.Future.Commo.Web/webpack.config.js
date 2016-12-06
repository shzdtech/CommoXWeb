"use strict";
var extractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'bootstrap-loader',
        "./Client/Scripts/index.jsx"],
    parserOptions: {
        sourceType: 'module'
    },
    output: {
        path: './wwwroot/dist',
        publicPath: '/dist/',
        filename: "bundle.js"
    },
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9010
    },
    plugins: [
        new extractTextPlugin("bundle.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                dead_code: true,
                unused: true
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators-legacy'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/, loader: extractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=10000?name=/dist/images/[hash].[ext]'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },

            // Bootstrap 3
            {
                test: /bootstrap-sass(\\|\/)assets(\\|\/)javascripts(\\|\/)/,
                loader: 'imports?jQuery=jquery'
            },
            {
                test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
                loader: 'imports?define=>false&this=>window'
            }
        ]
    },
    sassLoader: {
        includePaths: [
            path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets/'),
            path.resolve(__dirname, './node_modules/compass-mixins/lib/')
        ]
    },
    resolve: {
        root: path.resolve('./Client/Scripts'),
        extensions: ['', '.js', '.jsx']
    },
};