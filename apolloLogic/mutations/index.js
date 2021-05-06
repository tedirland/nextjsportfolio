import { gql } from '@apollo/client';

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio {
    createPortfolio(
      input: {
        title: "New Job"
        company: "New Company"
        companyWebsite: "New Website"
        location: "New location"
        jobTitle: "New title"
        description: "New Desc"
        startDate: "1/1/2020"
        endDate: "1/1/2021"
      }
    ) {
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

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: ID) {
    updatePortfolio(
      id: $id
      input: {
        title: "Updated Job"
        company: "Updated Company"
        companyWebsite: "Updated Website"
        location: "Updated location"
        jobTitle: "Updated title"
        description: "Updated Desc"
        startDate: "1/1/2020"
        endDate: "1/1/2021"
      }
    ) {
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

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;
