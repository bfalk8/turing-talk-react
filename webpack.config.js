let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let BUILD_DIR = path.resolve(__dirname, 'public');
let APP_DIR = path.resolve(__dirname, 'src/client');
let PUBLIC_DIR = path.resolve(__dirname, 'public');

let extractCSS = new ExtractTextPlugin('styles.css');

let config = {
  context: APP_DIR,
  entry: './index.jsx',
  output: {
    filename: 'index.js',
    path: BUILD_DIR,
    publicPath: PUBLIC_DIR
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
    root: [
      path.resolve(__dirname, './src/client/')
    ],
    modulesDirectories: [
      path.resolve(__dirname, './node_modules'),
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        loader: extractCSS.extract(['css', 'sass'])
      }
    ]
  },
  plugins: [
    extractCSS
  ]
};

module.exports = config;
