module.exports = {
    entry: {
        'docs/dist/demo': './docs/demo.tsx'
    },
    output: {
        filename: '[name].js'
    }          ,
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?|.ts?$/,
                use: [
                   
                     'ts-loader'
                ]
            },
            { test: /\.css$/, loader: 'style-loader!css-loader?url=false' },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.md$/, loader: 'html!markdown-loader' },
            { test: /\.svg$/, loader: 'svg-inline-loader' },
            { test: /\.(eot|ttf|woff|woff2)$/, loader: 'file-loader' }
        ]
    }

};
