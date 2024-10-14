const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // Creates style nodes from JS strings
          "css-loader", // Translates CSS into CommonJS
          "postcss-loader", // Processes CSS with PostCSS (necessary for Tailwind)
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|webp)$/,
        use: {
          loader: "file-loader",
          options: { name: "[name].[ext]" },
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "4geeks.ico",
      template: "template.html",
    }),
    new Dotenv({ safe: true, systemvars: true }),
  ],
};
