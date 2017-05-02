"use strict";

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractStyles = new ExtractTextPlugin("css/style.css");

let webpack_config = {
    context: path.resolve(__dirname),
    entry: {
        entry: "./src/scripts/entry",
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js"
    },

    resolve: {
        extensions: [".js"],
    },

    resolveLoader: {
        modules: ["node_modules"],
        moduleExtensions: ["-loader"]
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractStyles.extract({
                    use: [
                        {
                            loader: "css",
                            options: {
                                root: path.resolve(__dirname),
                            }
                        },
                        {
                            loader: "sass"
                        }
                    ]
                })
            },
            {
                test: /images\/(.*|.*\/.*)\.(png|jpg|svg|ttf|eot|woff|woff2)/,
                loader: "file?name=assets/[path][name].[ext]&publicPath=../"
            }
        ]
    },

    plugins: [
        extractStyles,
    ]
};

module.exports = webpack_config;
