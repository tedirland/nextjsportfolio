class Topic {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAllByCategory(forumCategory) {
    return this.Model.find({ forumCategory })
      .populate('user')
      .populate('forumCategory');
  }

  async create(topicData) {
    if (!this.user) {
      throw new Error('Must be logged in to create a topic!');
    }

    topicData.user = this.user;
    //Generate Slug
    topicData.slug = 'doesnt-matter';

    const createdTopic = await this.Model.create(topicData);

    return this.Model.findById(createdTopic._id)
      .populate('user')
      .populate('forumCategory');
  }
}

module.exports = Topic;
