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
  signIn(signInData) {
    return `signing In user: ${signInData.email} - ${signInData.password}`;
  }

  signOut() {
    return 'Signing Out...';
  }
}

module.exports = User;
