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
        filename: "./wwwroot/dist/bundle.js"
    },
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9010
    },
    plugins: [
        new extractTextPlugin("./wwwroot/dist/bundle.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
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
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
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