const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const users_router = require('./routers/users');
const cookie_parser = require('cookie-parser');

const app = express();
const port = 8080;

app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.static('public'));
app.use(cookie_parser());

app.use('/users', users_router);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Port: ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
