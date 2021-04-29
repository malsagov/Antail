import {gql} from '@apollo/client'

export const GET_USERS = gql`
query GetUsers {
    Page(page: 1, perPage: 10) {
      users {
        id
        name
        bannerImage
        avatar {
          medium
          large
        }
      }
    }
} `
