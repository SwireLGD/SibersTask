const path = require('path');

const envFile = process.env['NODE_ENV'] ? `.env.${process.env['NODE_ENV']}` : '.env';
require('dotenv').config({ path: envFile });

const rootPath = __dirname;

const config = {
  rootPath,
  port: (process.env['PORT'] && parseInt(process.env['PORT'])) || 8080,
  publicPath: path.join(rootPath, 'public'),
  mongoose: {
    db: 'mongodb://127.0.0.1:27017/sibersApi',
  },
  JwtAccessExpiresAt: 60 * 15,
  JwtRefreshExpiresAt: 1000 * 60 * 60 * 370,
};

module.exports = config;
