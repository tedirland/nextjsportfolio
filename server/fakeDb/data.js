const mongoose = require('mongoose');

const user1ID = mongoose.Types.ObjectId();
const user2ID = mongoose.Types.ObjectId();

const data = {
  users: [
    {
      _id: user1ID,
      avatar:
        'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      email: 'irlandth@gmail.com',
      name: 'Ted Irland',
      username: 'tedirland',
      info: 'Hello, my name is Ted and I am a developer',
      password: 'tedted',
      role: 'admin',
    },
    {
      _id: user2ID,
      avatar:
        'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      email: 'testy@gmail.com',
      name: 'Test Man',
      username: 'tester99',
      info: 'Hello, my name is Testman and I am a developer',
      password: 'test21',
      role: 'guest',
    },
  ],
  portfolios: [
    {
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programing....',
      startDate: '01/01/2014',
      endDate: '01/01/2016',
      user: user1ID,
    },
    {
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsoble for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013',
      user: user1ID,
    },
    {
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011',
      user: user1ID,
    },
  ],
};

module.exports = data;
