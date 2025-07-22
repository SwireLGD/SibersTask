const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/Auth');
const permit = require('../middleware/Permit');
const User = require('../models/User');
const crypto = require('crypto');
const verify_refresh_token = require('../middleware/Verify_refresh_token');

const users_router = express.Router();

users_router.post('/register', auth, permit(['admin']), async (req, res, next) => {
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

users_router.post('/login', async (req, res, next) => {
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
    const refresh_token = jwt.sign({ user: user._id }, process.env.JWT_REFRESH, {
      expiresIn: '7d',
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send({ accessToken, user });
  } catch (e) {
    next(e);
  }
});


users_router.get('/', auth, permit(['admin']), async (_req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

users_router.patch('/edit_user/:id', auth, permit(['admin']), async (req, res, next) => {
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

users_router.patch('/toggle_role_change/:id', auth, permit(['admin']), async (req, res, next) => {
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

const user_refresh_token = async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id); 

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const accessToken = jwt.sign(
      { user: req.user._id },
      process.env.JWT_ACCESS,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { user: req.user._id },
      process.env.JWT_REFRESH,
      { expiresIn: '7d' } 
    );

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send({ accessToken, user });
  } catch (e) {
    next(e);
  }
};

users_router.delete('/logout', (req, res, next) => {
  try {
    res.cookie('refresh_token', '', {
      httpOnly: true,
      maxAge: 0,
    });
    res.status(200).send('Рефреш токен успешно очищен!');
  } catch (e) {
    next(e);
  }
});

users_router.delete('/:id', auth, permit(['admin']), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).send({ error: 'Пользователь не найден' });
    res.send({ message: 'Пользователь удалён' });
  } catch (e) {
    next(e);
  }
});

users_router.get('/refresh', verify_refresh_token, user_refresh_token);

module.exports = users_router;