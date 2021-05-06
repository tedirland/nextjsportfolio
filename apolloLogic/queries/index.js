import { gql } from '@apollo/client';

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      _id
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
