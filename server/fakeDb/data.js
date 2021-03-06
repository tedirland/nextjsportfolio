const mongoose = require('mongoose');
const moment = require('moment');

const user1ID = mongoose.Types.ObjectId();
const user2ID = mongoose.Types.ObjectId();

const forum1ID = mongoose.Types.ObjectId();
const forum2ID = mongoose.Types.ObjectId();
const forum3ID = mongoose.Types.ObjectId();

const topic1ID = mongoose.Types.ObjectId();

const post1ID = mongoose.Types.ObjectId();
const post1CreatedAt = moment().subtract(7, 'days');

const post2ID = mongoose.Types.ObjectId();
const post2CreatedAt = moment(post1CreatedAt).add(1, 'days');

const post3ID = mongoose.Types.ObjectId();
const post3CreatedAt = moment(post2CreatedAt).add(1, 'days');

const post4ID = mongoose.Types.ObjectId();
const post4CreatedAt = moment(post3CreatedAt).add(1, 'days');

const data = {
  users: [
    {
      _id: user1ID,
      avatar:
        'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png',
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
        'https://static.wikia.nocookie.net/finalfantasy/images/1/1f/RedXIII-FFVIIArt.png/revision/latest/scale-to-width-down/404?cb=20110227161510',
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

  forumCategories: [
    {
      _id: forum1ID,
      title: 'General Discussion',
      subTitle: 'Open any topic you want',
      slug: 'general-discussion',
    },
    {
      _id: forum2ID,
      title: 'Job Requests',
      subTitle: 'Post here job opportunities',
      slug: 'job-requests',
    },
    {
      _id: forum3ID,
      title: 'Developer Jokes',
      subTitle: 'Just funny developing stuff',
      slug: 'developer-jokes',
    },
  ],
  topics: [
    {
      _id: topic1ID,
      title: 'How to learn JS',
      slug: 'how-to-learn-js',
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: forum1ID,
      user: user1ID,
    },
    {
      title: 'How to learn JAVA',
      slug: 'how-to-learn-java',
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: forum1ID,
      user: user1ID,
    },
    {
      title: 'How to learn C++',
      slug: 'how-to-learn-c++',
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: forum1ID,
      user: user1ID,
    },
  ],

  posts: [
    {
      _id: post1ID,
      content: 'Hey there how are you ?',
      slug: 'md43',
      fullSlug: post1CreatedAt.toISOString() + ':md43',
      topic: topic1ID,
      user: user1ID,
      createdAt: post1CreatedAt,
    },
    {
      _id: post2ID,
      content: 'What do you think about this?',
      slug: 'md59',
      fullSlug: post2CreatedAt.toISOString() + ':md59',
      topic: topic1ID,
      user: user2ID,
      createdAt: post2CreatedAt,
    },
    {
      _id: post3ID,
      content: 'I think its nice (:',
      slug: 'md59/md79',
      fullSlug:
        post2CreatedAt.toISOString() +
        ':md59' +
        '/' +
        post3CreatedAt.toISOString() +
        ':md79',
      topic: topic1ID,
      user: user1ID,
      parent: post2ID,
      createdAt: post3CreatedAt,
    },
    {
      _id: post4ID,
      content: 'Good to hear that!',
      slug: 'md59/md79/md89',
      fullSlug:
        post2CreatedAt.toISOString() +
        ':md59' +
        '/' +
        post3CreatedAt.toISOString() +
        ':md79' +
        '/' +
        post4CreatedAt.toISOString() +
        ':md89',
      topic: topic1ID,
      user: user2ID,
      parent: post3ID,
      createdAt: post4CreatedAt,
    },
  ],
};

module.exports = data;
