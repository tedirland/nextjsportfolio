class User {
  constructor(model) {
    this.Model = model;
  }

  async signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error('Password must be the same as confirmation password!');
    }
    try {
      return await this.Model.create(signUpData);
    } catch (e) {
      if (e.code && e.code === 11000) {
        throw new Error('A user with this email already exists in our system.');
      } else {
        throw new Error(e.message);
      }
    }
  }
  async signIn(signInData, ctx) {
    try {
      const user = await ctx.authenticate(signInData);
      console.log(user);
      return user;
    } catch (error) {
      return error;
    }
  }

  signOut(ctx) {
    try {
      ctx.logout();
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = User;
