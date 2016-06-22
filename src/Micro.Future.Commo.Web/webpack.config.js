﻿"use strict";
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
    entry: "./Client/Scripts/sample.jsx",
    output: {
        filename: "./dist/bundle.js"
    },
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9000
    },
    module: {
        loaders: [
          {
              test: /.jsx?$/,
              loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators-legacy'],
              exclude: /node_modules/
          },
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract('style', 'css!sass')
          },
          {
              test: /\.(png|woff|woff2|eot|ttf|svg)$/,
              loader: 'url-loader?limit=100000'
          },
          {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              loader: 'eslint-loader'
          }
        ]
    },
    sassLoader: {
        includePaths: [
          path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets/'),
          path.resolve(__dirname, './node_modules/compass-mixins/lib/')
        ]
    }
};