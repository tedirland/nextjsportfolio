var slugify = require('slugify');
var uniqueSlug = require('unique-slug');

class Topic {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }
  async getRandoms(limit) {
    const count = await this.Model.countDocuments();
    let randomIndex;

    if (limit > count) {
      randomIndex = 0;
    } else {
      randomIndex = count - limit;
    }
    const random = Math.round(Math.random() * randomIndex);
    return this.Model.find({}).skip(random).limit(limit).populate('user');
  }

  getBySlug(slug) {
    return this.Model.findOne({ slug })
      .populate('user')
      .populate('forumCategory');
  }

  getAllByCategory(forumCategory) {
    return this.Model.find({ forumCategory })
      .populate('user')
      .populate('forumCategory');
  }

  async _create(data) {
    const createdTopic = await this.Model.create(data);

    return this.Model.findById(createdTopic._id)
      .populate('user')
      .populate('forumCategory');
  }

  async create(topicData) {
    if (!this.user) {
      throw new Error('Must be logged in to create a topic!');
    }

    topicData.user = this.user;
    topicData.slug = slugify(topicData.title, {
      lower: true,
    });

    let topic;

    try {
      topic = await this._create(topicData);
      return topic;
    } catch (e) {
      if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
        topicData.slug += `-${uniqueSlug()}`;
        topic = await this._create(topicData);
        return topic;
      }
      return null;
    }
  }
}

module.exports = Topic;
