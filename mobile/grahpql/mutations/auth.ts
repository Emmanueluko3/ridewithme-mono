import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation RegisterUser($input: RegisterInput!) {
    register(input: $input) {
      accessToken
      refreshToken
      user {
        id
        name
        email
        type
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        id
        name
        email
        type
      }
    }
  }
`;
