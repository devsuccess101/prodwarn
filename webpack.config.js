const contentScripts = require('./webpack/content-scripts');
const popup = require('./webpack/popup');

module.exports = [
  contentScripts,
  popup,
];
