const passport = require('passport');
// options == {email, password}
const authenticateUser = (req, options) => {
  return new Promise((resolve, reject) => {
    const done = (error, user) => {
      if (error) {
        return reject(new Error(err));
      }

      if (user) {
        req.login(user, error => {
          if (error) {
            return reject(new Error(error));
          }
          return resolve(user);
        });
      } else {
        return reject(new Error('invalid password or email'));
      }
    };

    const authFn = passport.authenticate('graphql', options, done);
    authFn();
  });
};

exports.buildAuthContext = req => {
  const auth = {
    authenticate: options => authenticateUser(req, options),
    logout: () => req.logout(),
  };
  return auth;
};
