const passport = require('passport');
// options == {email, password}
const authenticateUser = options => {
  return new Promise((resolve, reject) => {
    const done = (error, user) => {
      if (error) {
        return reject(new Error(err));
      }
      //If user is present, save session to DB
      if (user) {
        return resolve(user);
      } else {
        return reject(new Error('invalid password or email'));
      }
    };

    const authFn = passport.authenticate('graphql', options, done);
    authFn();
  });
};

exports.buildAuthContext = () => {
  const auth = {
    authenticate: options => {
      return authenticateUser(options);
    },
  };
  return auth;
};
