import {gql} from '@apollo/client'

export const GET_USER = gql`
query GetUser($name: String) {
    User(name: $name) {
        id
        name
        bannerImage
        avatar {
            medium
            large
        }
        about
    }
} `
