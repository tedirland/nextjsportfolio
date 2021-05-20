import { gql } from '@apollo/client';

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      _id
      daysOfExperience @client
      title
      jobTitle
      description
      company
      companyWebsite
      location
      startDate
      endDate
    }
  }
`;

export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios {
      _id
      title
      description
      company
      companyWebsite
      location
      startDate
      endDate
    }
  }
`;

export const GET_USER_PORTFOLIOS = gql`
  query UserPortfolios {
    userPortfolios {
      _id
      title
      jobTitle
      startDate
      endDate
    }
  }
`;

export const GET_USER = gql`
  query User {
    user {
      _id
      username
      role
    }
  }
`;

//FORUM QUERIES START----

export const GET_FORUM_CATEGORIES = gql`
  query ForumCategories {
    forumCategories {
      slug
      title
      subTitle
    }
  }
`;

const topicResponse = `

_id
slug
title
content
user {
  username
  avatar
}
forumCategory {
  _id
  title
  slug
}`;

export const TOPICS_BY_CATEGORY = gql`
  query TopicsByCategory($category: String) {
    topicsByCategory(category: $category) {
        ${topicResponse}
    }
  }
`;
export const TOPICS_BY_SLUG = gql`
  query TopicBySlug($slug: String) {
    topicBySlug(slug: $slug) {
      ${topicResponse}
    }
  }
`;

const postResponse = `
_id
content
slug
createdAt
user {
  username
  avatar
}
parent {
  content
  user {
    username
    avatar
  }
}
`;
export const POSTS_BY_TOPIC = gql`

query PostsByTopic($slug: String, $pageNum: Int, $pageSize: Int) {
postsByTopic(slug: $slug, pageNum: $pageNum, pageSize: $pageSize) {
 posts {
  ${postResponse}
 }
 count
}
}

`;

export const CREATE_POST = gql`
  mutation CreatePost($content: String, $topic: String, $parent: String) {
    createPost(input: { content: $content, topic: $topic, parent: $parent })
    {
      ${postResponse}

    }
  }
`;

export const GET_HIGHLIGHT = gql`
  query Highlight($limit: Int) {
    highlight(limit: $limit) {
      topics {
        _id
        title
        content
        slug
        user {
          username
          avatar
        }
        createdAt
      }
      portfolios {
        _id
        title
        description
        jobTitle
        startDate
        endDate
      }
    }
  }
`;
//FORUM QUERIES END----
