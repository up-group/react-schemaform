module.exports = {
    entry: "./index.tsx",
    output: {
        filename: "index.js",
        path: __dirname + "/dist"
    },
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