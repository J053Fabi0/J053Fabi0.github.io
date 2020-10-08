const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtracPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      // Aquí vienen todos los loaders de webpack
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
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        exclude: /node-modules/,
        use: ["file-loader"],
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
    new HtmlWebpackPlugin({
      template: "./src/index.html", // ¿Qué archivo de html será la base del proyecto?
      filename: "./index.html", // ¿Qué único archivo de html se va a generar?
    }),
    new MiniCssExtracPlugin({
      filename: "[name].css",
      chunckFilename: "[id].css",
    }),
  ],
};
