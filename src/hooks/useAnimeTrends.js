import { useQuery } from '@apollo/client'

import { GET_CURRENT_ANIME_TRENDS } from '../graphql/queries/getCurrentAnimeTrends'

export const useAnimeTrends = () => {
    const {loading: animeLoading, error: animeError, data: animeTrends} = useQuery(GET_CURRENT_ANIME_TRENDS, {
        variables: {
            "type": "ANIME",
            "season": "SPRING",
            "seasonYear": 2021,
            "nextSeason": "SUMMER",
            "nextYear": 2021
        }
    })

    return {animeLoading, animeError, animeTrends}
}