module.exports = {
    entry: {
        'demo/dist/demo': './demo/demo.tsx',
        'dist/index': './index.tsx'
    },
    output: {
        path: './',
        filename: '[name].js'
    }          ,
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.tsx?|.ts?$/, loader: "awesome-typescript-loader" },
        ],
    }
  
};