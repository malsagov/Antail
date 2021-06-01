import { gql } from '@apollo/client'

export const GET_FILTERS = gql`
    {
        genres: GenreCollection
        tags: MediaTagCollection {
            name
            description
            category
            isAdult
        }
    }  
`

