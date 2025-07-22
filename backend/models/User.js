const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Поле имени пользователя обязательно!'],
    },
    password: {
      type: String,
      required: [true, 'Поле пароля обязательно!'],
    },
    first_name: {
      type: String,
      required: [true, 'Введите имя!'],
    },
    last_name: {
      type: String,
      required: [true, 'Введите фамилию!'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Укажите пол!'],
    },
    birthdate: {
      type: Date,
      required: [true, 'Укажите дату рождения!'],
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { versionKey: false }
);

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;