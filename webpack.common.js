var webpack = require("webpack");
var version = require("./package.json").version;
var banner =
  "/**\n" +
  " * vue-helmet v" + version + "\n" +
  " * https://github.com/miaolz123/vue-helmet\n" +
  " * MIT License\n" +
  " */\n";

module.exports = {
  entry: "./src/VueHelmet.js",
  target: "node",
  output: {
    path: "./dist",
    filename: "vue-helmet.common.js",
    library: "VueHelmet",
    libraryTarget: "umd"
  },
  externals: /^[^.]/,
  plugins: [
    new webpack.BannerPlugin(banner, { raw: true })
  ],
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: "vue"
    }, {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: "style!css"
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }]
  },
}
