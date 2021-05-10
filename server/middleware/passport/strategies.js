const { Strategy } = require('passport-strategy');

// Strategy get options(email, passowrd) needed to authenticate user
//Strategy gets a callback function that will contain functionality to verify a user
// Strategy has to have "authenticate" function
//Strategy has access to "error" "fail" and "success" functions

class GraphqlStrategy extends Strategy {
  constructor(verify) {
    super();
    if (!verify) {
      throw new Error('Graphql strategy requires a verify callback');
    }
    this.verify = verify;
    this.name = 'graphql';
  }
  authenticate(_, options) {
    console.log('Calling authenticate in strategy');

    //in done we will recieve error, user, and info
    const done = () => {
      if (true) {
        // this.success('LoggedInUser');
        this.error('Some nasty error');
      }

      // if user then call "success"//Otherwise call "fail" or "error"
    };

    this.verify(options, done);
  }
}

module.exports = GraphqlStrategy;
