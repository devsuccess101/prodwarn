/* eslint-disable import/no-extraneous-dependencies */
const { resolve } = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { EnvironmentPlugin } = require('webpack');

const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const package = require('../package.json');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: process.env.NODE_ENV,

  name: 'popup',

  entry: [
    './src/popup/main.ts',
  ],

  output: {
    path: resolve(__dirname, '../dist/popup'),
    filename: 'js/index.js',
  },

  resolve: {
    extensions: ['.js', '.ts', '.vue', '.scss', '.css'],
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
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                tailwindcss,
                autoprefixer,
              ],
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]',
          publicPath: '../',
          esModule: false,
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]?[hash]',
          esModule: false,
        },
      },
    ],
  },

  plugins: [
    new EnvironmentPlugin({
      PACKAGE_NAME: package.name,
      PACKAGE_VERSION: package.version,
    }),

    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
      ignoreOrder: false,
    }),

    new HtmlPlugin({
      template: resolve(__dirname, '../templates/popup.html'),
      filename: 'index.html',
    }),
  ],
};
