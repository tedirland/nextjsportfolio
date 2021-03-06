const mongoose = require('mongoose');
const config = require('../config');
const fakeDb = require('./FakeDb');

mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  async () => {
    console.log('Adding data...');
    await fakeDb.populate();
    await mongoose.connection.close();
    console.log('DB has been populated');
  }
);
