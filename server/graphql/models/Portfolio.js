class Portfolio {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAll() {
    return this.Model.find({});
  }
  getAllByUser() {
    return this.Model.find({ user: this.user._id }).sort({ startDate: 'desc' });
  }

  getById(id) {
    return this.Model.findById(id);
  }

  create(data) {
    data.user = this.user;
    return this.Model.create(data);
  }

  findAndUpdate(id, data) {
    return this.Model.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  findAndDelete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }
}

module.exports = Portfolio;
