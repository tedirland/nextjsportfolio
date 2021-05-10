const GraphqlStrategy = require('./strategies');
const User = require('../../db/models/user');

exports.init = passport => {
  passport.use(
    'graphql',
    new GraphqlStrategy(({ email }, done) => {
      User.findOne({ email }, (error, user) => {
        if (error) {
          return done(error);
        }
        if (!user) {
          return done(null, false);
        }
        //TODO: Verify user password
        return done(null, user);
      });
    })
  );
};
