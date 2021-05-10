const GraphqlStrategy = require('./strategies');
const User = require('../../db/models/user');
const user = require('../../db/models/user');

exports.init = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.use(
    'graphql',
    new GraphqlStrategy(({ email, password }, done) => {
      User.findOne({ email }, (error, user) => {
        if (error) {
          return done(error);
        }
        if (!user) {
          return done(null, false);
        }
        // //TODO: Verify user password
        // return done(null, user);
        user.validatePassword(password, (error, isSuccess) => {
          if (error) {
            return done(error);
          }
          if (!isSuccess) {
            return done(null, false);
          }

          return done(null, user);
        });
      });
    })
  );
};
