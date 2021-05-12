import { gql } from '@apollo/client';

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio(
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    createPortfolio(
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
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

//AUTH MUTATIONS

export const SIGN_UP = gql`
  mutation (
    $avatar: String
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      input: {
        avatar: $avatar
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    )
  }
`;
export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      username
      role
      avatar
    }
  }
`;
export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;
//AUTH MUTATIONS END
