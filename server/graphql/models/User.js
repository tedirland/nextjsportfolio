class User {
  constructor(model) {
    this.Model = model;
  }

  signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error('Password must be the same as confirmation password!');
    }
    return this.Model.create(signUpData);
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
      // console.log('Before Logout');
      // console.log(ctx.isAuthenticated());
      // console.log('user', ctx.getUser());
      ctx.logout();
      // console.log('After Logout');
      // console.log(ctx.isAuthenticated());
      // console.log('user', ctx.getUser());
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = User;
