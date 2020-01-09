const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line

const pkg = require('../package.json');
const manifestTemplate = require('../templates/manifest.json');

module.exports = {
  mode: process.env.NODE_ENV,

  name: 'content-scripts',

  entry: [
    './src/content-scripts/main.ts',
  ],

  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'content-scripts/main.js',
  },

  resolve: {
    extensions: ['.js', '.ts'],
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

  plugins: [
    new CopyWebpackPlugin([
      {
        from: './templates/manifest.json',
        to: 'manifest.json',
        transform: () => {
          manifestTemplate.version = pkg.version;

          return Buffer.from(JSON.stringify(manifestTemplate, null, 2));
        },
      },
      {
        from: './static',
        to: 'static',
      },
    ]),
  ],
};
