const fs = require('fs');
const archiver = require('archiver'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = ({ sourceDir, output: { path, filename } }) => new Promise((resolve, reject) => {
  const output = fs.createWriteStream(`${path}/${filename}`);
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  output.on('close', () => resolve({
    path: output.path,
    size: archive.pointer(),
  }));

  output.on('end', () => {
    console.log('Data has been drained');
  });

  archive.on('error', (err) => {
    reject(err);
  });

  // pipe archive data to the file
  archive.pipe(output);

  archive.directory(sourceDir, false);

  archive.finalize();
});
