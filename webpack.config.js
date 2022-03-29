const path = require("path");
const yargs = require("yargs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

// Phaser webpack config
const options = yargs.alias("p", "production").argv;
const isProduction = options.production;

const webpackConfig = {
  entry: {
    main: ["@babel/polyfill", path.resolve(__dirname, "src/app.js")], //,path.resolve(__dirname,'lib/core.js')
  },
  output: {
    path: !isProduction
      ? path.resolve(__dirname, "dist")
      : path.resolve(__dirname, "dist", "host"),
    publicPath: isProduction ? "./" : "/",
    filename: "main.bundle.js",
  },
  watch: false,
  plugins: [
    new FriendlyErrorsWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body",
    }),
    new CopyWebpackPlugin([
      {
        from: "assets",
        to: "assets",
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          // The `injectType`  option can be avoided because it is default behaviour
          { loader: "style-loader", options: { injectType: "styleTag" } },
          "css-loader",
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|otf|ttc)$/,
        loader: "url-loader?limit=100000",
      },
    ],
  },
  devServer: {
     host: '192.168.1.132',
    historyApiFallback: true,
    quiet: true,
  },
};

if (!isProduction) {
  webpackConfig.devtool = "inline-source-map";
}

module.exports = webpackConfig;
