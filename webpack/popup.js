const { resolve } = require('path');
const HtmlPlugin = require('html-webpack-plugin'); // eslint-disable-line
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // eslint-disable-line

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
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]?[hash]',
        },
      },
    ],
  },

  plugins: [
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
