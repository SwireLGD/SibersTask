const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const auth = require('../middleware/Auth');
const permit = require('../middleware/Permit');
const User = require('../models/User');
const crypto = require('crypto');

const usersRouter = express.Router();

usersRouter.post('/register', async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, gender, birthdate, role } = req.body;

    const user = new User({
      username,
      password: password || crypto.randomUUID(),
      first_name,
      last_name,
      gender,
      birthdate,
      role: role || 'user',
    });

    await user.save();
    res.send(user);
  } catch (e) {
    next(e);
  }
});

usersRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send({ error: 'Логин или пароль не совпадают.' });
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Логин или пароль не совпадают.' });
    }

    const accessToken = jwt.sign({ user: user._id }, process.env.JWT_ACCESS, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ user: user._id }, process.env.JWT_REFRESH, {
      expiresIn: '7d',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send({ accessToken, user });
  } catch (e) {
    next(e);
  }
});

usersRouter.get('/', auth, permit(['admin']), async (_req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

usersRouter.patch('/editUser/:id', auth, permit(['admin']), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, gender, birthdate, role } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).send({ error: 'Нет пользователя с таким ID' });

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.gender = gender || user.gender;
    user.birthdate = birthdate || user.birthdate;
    user.role = role || user.role;

    await user.save();
    res.send(user);
  } catch (e) {
    next(e);
  }
});

usersRouter.patch('/toggleRoleChange/:id', auth, permit(['admin']), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).send({ error: 'Нет пользователя с таким ID' });

    user.role = user.role === 'admin' ? 'user' : 'admin';
    await user.save();
    res.send(user);
  } catch (e) {
    next(e);
  }
});

usersRouter.get('/refresh', async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).send({ error: 'No refresh token' });

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH);
    } catch (e) {
      return res.status(401).send({ error: 'Invalid refresh token' });
    }

    const user = await User.findById(decoded.user);
    if (!user) return res.status(403).send({ error: 'Wrong token' });

    const accessToken = jwt.sign({ user: user._id }, process.env.JWT_ACCESS, {
      expiresIn: '15m',
    });
    const newRefreshToken = jwt.sign({ user: user._id }, process.env.JWT_REFRESH, {
      expiresIn: '7d',
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send({ accessToken, user });
  } catch (e) {
    next(e);
  }
});

usersRouter.delete('/logout', (req, res, next) => {
  try {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      maxAge: 0,
    });
    res.status(200).send('Рефреш токен успешно очищен!');
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;