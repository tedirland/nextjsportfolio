import {
  GET_PORTFOLIOS,
  GET_USER_PORTFOLIOS,
  GET_USER,
  GET_PORTFOLIO,
  GET_FORUM_CATEGORIES,
  TOPICS_BY_CATEGORY,
} from '../queries';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
  UPDATE_PORTFOLIO,
  CREATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  SIGN_IN,
  SIGN_OUT,
  CREATE_TOPIC,
} from '../mutations';

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);
export const useGetPortfolio = options => useQuery(GET_PORTFOLIO, options);

export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () =>
  useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
      const { userPortfolios } = cache.readQuery({
        query: GET_USER_PORTFOLIOS,
      });
      const newPortfolios = userPortfolios.filter(
        p => p._id !== deletePortfolio
      );
      cache.writeQuery({
        query: GET_USER_PORTFOLIOS,
        data: { userPortfolios: newPortfolios },
      });
    },
  });

export const useCreatePortfolio = () =>
  useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      try {
        const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
        cache.writeQuery({
          query: GET_PORTFOLIOS,
          data: { portfolios: [...portfolios, createPortfolio] },
        });
      } catch {
        //can error handling go in here?
      }
    },
  });

//Auth Actions Start -----------------
export const useSignIn = () =>
  useMutation(SIGN_IN, {
    update(cache, { data: { signIn: signedInUser } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user: signedInUser },
      });
    },
  });

export const useSignOut = () => useMutation(SIGN_OUT);
export const useLazyGetUser = () => useLazyQuery(GET_USER);
export const useGetUser = () => useQuery(GET_USER);
//Auth Actions End -------------------

//Forum Actions Start

export const useGetForumCategories = () => useQuery(GET_FORUM_CATEGORIES);

export const useGetTopicsByCategory = options =>
  useQuery(TOPICS_BY_CATEGORY, options);

export const useCreateTopic = () =>
  useMutation(CREATE_TOPIC, {
    update(cache, { data: { createTopic } }) {
      try {
        const { topicsByCategory } = cache.readQuery({
          query: TOPICS_BY_CATEGORY,
          variables: { category: createTopic.forumCategory.slug },
        });
        cache.writeQuery({
          query: TOPICS_BY_CATEGORY,
          data: { topicsByCategory: [...topicsByCategory, createTopic] },
          variables: { category: createTopic.forumCategory.slug },
        });
      } catch (e) {}
    },
  });
//Forum Actions End
