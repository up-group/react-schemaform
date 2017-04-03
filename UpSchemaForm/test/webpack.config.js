module.exports = {
    entry: "./index.tsx",
    output: {
        filename: "index.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {

        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?|.ts?$/, loader: "awesome-typescript-loader" },
            //{
            //    test: /\.less$/,
            //    loader: "style-loader!css-loader!less-loader"
            //},
            { test: /\.css$/, loader: "style-loader!css-loader" },
            //{ test: /\.(jsx|js)$/, loaders: ['jsx'] },
            //{ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
            //{
            //    test: /\.(otf|eot|svg|ttf|woff)/,
            //    loader: 'url-loader?limit=8192'
            //}
            //{ test: /\.png$/, loader: "url-loader?limit=100000" },
            //{ test: /\.jpg$/, loader: "file-loader" },
            //{ test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            //{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            //{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            //{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }

            
        ],

        //preLoaders: [
        //    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        //    { test: /\.js$/, loader: "source-map-loader" }
        //]
    },

    externals: {
        //"react": "React",
        //"react-dom": "ReactDOM"
    },
};