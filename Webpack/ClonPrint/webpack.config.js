const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtracPlugin = require("mini-css-extract-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
  module: {
    rules: [
      // Aquí vienen todos los loaders de webpack
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        exclude: /node-modules/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          // El orden sí importa
          "style-loader", // Procesa styles en html
          "css-loader", // Prpocesa css files
          "sass-loader", // Procesa sass files
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtracPlugin({
      filename: "[name].css",
      chunckFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // ¿Qué archivo de html será la base del proyecto?
      filename: "./index.html", // ¿Qué único archivo de html se va a generar?
    }),
  ],
};
