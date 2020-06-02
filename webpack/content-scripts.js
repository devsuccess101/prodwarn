const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // eslint-disable-line

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
    extensions: ['.js', '.ts', '.vue', '.scss', '.sass', '.css'],
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
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },
      {
        test: /\.[s|a]?css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
      filename: 'content-scripts/main.css',
      ignoreOrder: false,
    }),

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
