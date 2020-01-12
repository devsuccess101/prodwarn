const { resolve } = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const webpackConfig = require('../webpack.config');

const createArchive = require('./create-archive');
const { name, version } = require('../package.json');

const compiler = webpack(webpackConfig);

compiler.run(async (err, stats) => {
  if (err || stats.hasErrors()) {
    throw error;
  }

  const statsString = stats.toString({
    colors: true,
    modules: false,
    entrypoints: false,
  });

  process.stdout.write(`${statsString}\n\n`);
  process.stdout.write('Packing extension...\n');

  try {
    const archive = await createArchive({
      sourceDir: 'dist',
      output: {
        path: resolve(__dirname, '../build'),
        filename: `${name}-v${version}.zip`,
      },
    });

    process.stdout.write(`Extension packed: ${archive.path}\n`);
    process.stdout.write(`Size: ${archive.size} total bytes\n`);
  } catch (e) {
    process.stdout.write('Error: Can not create archive.\n');
    throw e;
  }
});
