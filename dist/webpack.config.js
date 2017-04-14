module.exports = {
    entry: {
        'docs/dist/demo': './docs/demo.tsx'
    },
    output: {
        path: './',
        filename: '[name].js'
    },
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".css"]
    },
    module: {
        loaders: [
            { test: /\.tsx?|.ts?$/, loader: "ts-loader" },
            { test: /\.css$/, loader: 'css-loader?url=false' },
            { test: /\.md$/, loader: 'html!markdown-loader' },
            { test: /\.svg$/, loader: 'svg-inline-loader' },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=public/fonts/[name].[ext]'
            }
        ]
    }
};
//# sourceMappingURL=webpack.config.js.map