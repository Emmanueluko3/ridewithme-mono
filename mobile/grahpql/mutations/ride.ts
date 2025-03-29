import { gql } from "@apollo/client";

export const BOOK_RIDE = gql`
  mutation BookRide($input: BookRideInput!) {
    bookRide(input: $input) {
      id
      pickup
      dropoff
      carType
      status
    }
  }
`;

export const UPDATE_RIDE = gql`
  mutation UpdateRide($id: Int!, $input: UpdateRideInput!) {
    updateRide(id: $id, input: $input) {
      status
    }
  }
`;
