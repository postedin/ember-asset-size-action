'use strict';

const execa = require('execa');
const Counter = require('passthrough-counter');
const fs = require('fs');

module.exports = async (path, { level } = {}) => new Promise((resolve, reject) => {
  const { stdout } = execa('brotli', ['-c', `-${level !== undefined ? level : 'Z'}`, path]);

  const counter = new Counter;

  stdout.on('error', reject);

  stdout.pipe(counter).once('finish', () => {
    resolve(counter.length);
  }).pipe(fs.createWriteStream('/dev/null'));
});
