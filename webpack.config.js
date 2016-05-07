var webpack = require('webpack');
var version = require("./package.json").version;
var banner =
    "/**\n" +
    " * vue-helmet v" + version + "\n" +
    " * https://github.com/miaolz123/vue-helmet\n" +
    " * MIT License\n" +
    " */\n";

module.exports = {
    entry: './src/VueHelmet.js',
    output: {
        path:'./dist',
        filename: 'vue-helmet.common.js',
        library: 'VueHelmet',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.BannerPlugin(banner, {raw: true})
    ],
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }]
    },
}
