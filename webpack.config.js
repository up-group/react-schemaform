const webpack = require("webpack");
const path = require("path");
const os = require("os");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    entry: {
        demo: devMode ? "./docs/demo.tsx" : "./src/index.tsx"
    },
    output: {
        filename: devMode ? "[name].js" : "dist/[name].js"
    },
    devtool: 'inline-source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".css"]
    },
    module: {
        rules: [{
                test: /\.tsx?|.ts?$/,
                use: ["ts-loader"]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?url=false"
            },
            {
                test: /\.svg$/,
                loader: "svg-inline-loader"
            },
            {
                test: /\.(eot|ttf|woff|woff2|png)$/,
                loader: "file-loader"
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name].[hash].css",
            chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
        }),
        new HTMLWebpackPlugin({
            title: "Up - Schéma Form Démo",
            template: "docs/index.html"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true
        })
    ]
};