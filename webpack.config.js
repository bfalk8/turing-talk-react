var path = require('path');

let BUILD_DIR = path.resolve(__dirname, 'public');
let APP_DIR = path.resolve(__dirname, 'src/client');
let PUBLIC_DIR = path.resolve(__dirname, 'public');

var config = {
  context: APP_DIR,
  entry: './index.jsx',
  output: {
    filename: 'index.js',
    path: BUILD_DIR,
    publicPath: PUBLIC_DIR
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        loaders: [
          'style-loader', 
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]',
          'sass-loader'
        ]
      }
    ]
  }
};

module.exports = config;
