
const { PORT } = process.env;
const fs = require('fs');
const _ = require('lodash');
const path = require('path');

module.exports = {
  log: {
    morgan: 'combined',
    level: 'debug'
  },
  db: {
  },
  publicBuildDir: path.join(__dirname, '/../client/dist'),
  port: PORT || 18018
};
