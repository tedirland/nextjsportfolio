import { GET_PORTFOLIOS } from '../queries';
import { useQuery, useMutation } from '@apollo/client';
import {
  UPDATE_PORTFOLIO,
  CREATE_PORTFOLIO,
  DELETE_PORTFOLIO,
} from '../mutations';

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () =>
  useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      const newPortfolios = portfolios.filter(p => p._id !== deletePortfolio);
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: newPortfolios },
      });
    },
  });

export const useCreatePortfolio = () =>
  useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...portfolios, createPortfolio] },
      });
    },
  });
