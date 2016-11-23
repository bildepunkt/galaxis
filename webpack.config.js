/* eslint-disable */
var webpack = require("webpack");

module.exports = {
    entry: "./play/main.js",
    output: { path: "play", filename: "bundle.js" },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["latest"]
                }
            }
        ]
    }
};
