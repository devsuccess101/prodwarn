const { resolve } = require('path');

module.exports = {
  mode: process.env.NODE_ENV,

  name: 'background-scripts',

  entry: [
    './src/background.ts',
  ],

  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'background.js',
  },

  resolve: {
    extensions: ['.js', '.ts', '.scss', '.sass', '.css'],
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
