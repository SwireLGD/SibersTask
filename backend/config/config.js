const path = require('path');

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  mongoose: {
    db: 'mongodb://localhost/sibersApi',
  },
};

module.exports = config;