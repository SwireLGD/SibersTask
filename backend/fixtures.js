const mongoose = require('mongoose');
const config = require('./config/config');
const User = require('./models/User');

const dropCollection = async (db, collectionName) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop....`);
  }
};

const collections = ['users'];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  await User.create(
    {
      username: 'admin',
      password: 'admin',
      first_name: 'Иван',
      last_name: 'Админов',
      gender: 'other',
      birthdate: new Date('1980-01-01'),
      role: 'admin',
    },
    {
      username: 'user1',
      password: 'user',
      first_name: 'Мария',
      last_name: 'Петрова',
      gender: 'female',
      birthdate: new Date('1995-05-15'),
      role: 'user',
    },
    {
      username: 'user2',
      password: 'user',
      first_name: 'Алексей',
      last_name: 'Сидоров',
      gender: 'male',
      birthdate: new Date('1992-03-10'),
      role: 'user',
    },
    {
      username: 'user3',
      password: 'user3',
      first_name: 'Ольга',
      last_name: 'Кузнецова',
      gender: 'female',
      birthdate: new Date('2000-07-22'),
      role: 'user',
    },
    {
      username: 'user4',
      password: 'user4',
      first_name: 'Дмитрий',
      last_name: 'Иванов',
      gender: 'male',
      birthdate: new Date('1988-11-30'),
      role: 'user',
    },
    {
      username: 'user5',
      password: 'user5',
      first_name: 'Екатерина',
      last_name: 'Смирнова',
      gender: 'female',
      birthdate: new Date('1999-09-09'),
      role: 'user',
    },
    {
      username: 'user6',
      password: 'user6',
      first_name: 'Павел',
      last_name: 'Волков',
      gender: 'male',
      birthdate: new Date('1993-12-12'),
      role: 'user',
    },
    {
      username: 'user1',
      password: 'user',
      first_name: 'Мария',
      last_name: 'Петрова',
      gender: 'female',
      birthdate: new Date('1995-05-15'),
      role: 'user',
    },
    {
      username: 'user2',
      password: 'user',
      first_name: 'Алексей',
      last_name: 'Сидоров',
      gender: 'male',
      birthdate: new Date('1992-03-10'),
      role: 'user',
    },
    {
      username: 'user3',
      password: 'user3',
      first_name: 'Ольга',
      last_name: 'Кузнецова',
      gender: 'female',
      birthdate: new Date('2000-07-22'),
      role: 'user',
    },
    {
      username: 'user4',
      password: 'user4',
      first_name: 'Дмитрий',
      last_name: 'Иванов',
      gender: 'male',
      birthdate: new Date('1988-11-30'),
      role: 'user',
    },
    {
      username: 'user5',
      password: 'user5',
      first_name: 'Екатерина',
      last_name: 'Смирнова',
      gender: 'female',
      birthdate: new Date('1999-09-09'),
      role: 'user',
    },
    {
      username: 'user6',
      password: 'user6',
      first_name: 'Павел',
      last_name: 'Волков',
      gender: 'male',
      birthdate: new Date('1993-12-12'),
      role: 'user',
    },
    {
      username: 'user1',
      password: 'user',
      first_name: 'Мария',
      last_name: 'Петрова',
      gender: 'female',
      birthdate: new Date('1995-05-15'),
      role: 'user',
    },
    {
      username: 'user2',
      password: 'user',
      first_name: 'Алексей',
      last_name: 'Сидоров',
      gender: 'male',
      birthdate: new Date('1992-03-10'),
      role: 'user',
    },
    {
      username: 'user3',
      password: 'user3',
      first_name: 'Ольга',
      last_name: 'Кузнецова',
      gender: 'female',
      birthdate: new Date('2000-07-22'),
      role: 'user',
    },
    {
      username: 'user4',
      password: 'user4',
      first_name: 'Дмитрий',
      last_name: 'Иванов',
      gender: 'male',
      birthdate: new Date('1988-11-30'),
      role: 'user',
    },
    {
      username: 'user5',
      password: 'user5',
      first_name: 'Екатерина',
      last_name: 'Смирнова',
      gender: 'female',
      birthdate: new Date('1999-09-09'),
      role: 'user',
    },
    {
      username: 'user6',
      password: 'user6',
      first_name: 'Павел',
      last_name: 'Волков',
      gender: 'male',
      birthdate: new Date('1993-12-12'),
      role: 'user',
    },
    {
      username: 'user1',
      password: 'user',
      first_name: 'Мария',
      last_name: 'Петрова',
      gender: 'female',
      birthdate: new Date('1995-05-15'),
      role: 'user',
    },
    {
      username: 'user2',
      password: 'user',
      first_name: 'Алексей',
      last_name: 'Сидоров',
      gender: 'male',
      birthdate: new Date('1992-03-10'),
      role: 'user',
    },
    {
      username: 'user3',
      password: 'user3',
      first_name: 'Ольга',
      last_name: 'Кузнецова',
      gender: 'female',
      birthdate: new Date('2000-07-22'),
      role: 'user',
    },
    {
      username: 'user4',
      password: 'user4',
      first_name: 'Дмитрий',
      last_name: 'Иванов',
      gender: 'male',
      birthdate: new Date('1988-11-30'),
      role: 'user',
    },
    {
      username: 'user5',
      password: 'user5',
      first_name: 'Екатерина',
      last_name: 'Смирнова',
      gender: 'female',
      birthdate: new Date('1999-09-09'),
      role: 'user',
    },
    {
      username: 'user6',
      password: 'user6',
      first_name: 'Павел',
      last_name: 'Волков',
      gender: 'male',
      birthdate: new Date('1993-12-12'),
      role: 'user',
    },
  );

  await db.close();
};

run();
