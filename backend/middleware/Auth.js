const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const tokenData = req.get('Authorization');

  if (!tokenData) return res.status(401).send({ error: 'No token provided' });

  const [, token] = tokenData.split(' ');
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS);
  } catch (e) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const user = await User.findOne({ _id: decoded.user });

  if (!user) return res.status(403).send({ error: 'Wrong token' });

  req.user = user;
  next();
};

module.exports = auth;
