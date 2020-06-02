const contentScripts = require('./webpack/content-scripts');
const backgroundScripts = require('./webpack/background-scripts');
const popup = require('./webpack/popup');

module.exports = [
  contentScripts,
  backgroundScripts,
  popup,
];
