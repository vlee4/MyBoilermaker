module.exports = {
  entry: "./client/index.js",
  mode: "development",
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: "source-maps",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  target: "node",
};
