/*jshint esversion: 6 */
/* jshint node: true */

"use strict";
let path = require('path');
let debug = true; //process.env.NODE_ENV !== "production";
let webpack = require('webpack');
var fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: {
        server: "./src/index.ts"
    },
    node: {
        __filename: false,
        __dirname: false
    },
    target: 'node',
    output: {
        path: path.join(__dirname, ""),
        filename: "dist/[name].js",
        chunkFilename: "dist/[id].js"
    },
    externals: nodeModules,

    /*plugins: [
        new webpack.DefinePlugin({
            $dirname: '__dirname'
        })
    ],*/

    devtool: "source-map",

    resolve: {
        extensions: ['Webpack.Webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [{
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'awesome-typescript-loader'
            }
        ]
        /*,
                preLoaders: [
                    { test: /\.js$/, loader: "source-map-loader" }
                ]*/
    }
};