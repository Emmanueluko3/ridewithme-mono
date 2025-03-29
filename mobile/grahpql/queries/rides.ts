import { gql } from "@apollo/client";

export const GET_BOOKED_RIDE = gql`
  query GetBookedRide {
    getBookedRide {
      id
      user {
        name
        phone
        profile {
          location
        }
      }
      pickup
      dropoff
      carType
      fare
      status
      createdAt
      updatedAt
    }
  }
`;
export const GET_RIDES = gql`
  query GetRides {
    rides {
      totalCount
      rides {
        id
        user {
          name
          phone
          profile {
            location
          }
        }
        pickup
        dropoff
        carType
        fare
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_RIDE = gql`
  query GetRide($id: Int!) {
    ride(id: $id) {
      id
      user {
        name
        phone
        profile {
          location
        }
      }
      pickup
      dropoff
      carType
      fare
      status
      createdAt
      updatedAt
    }
  }
`;
