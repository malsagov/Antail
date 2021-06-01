import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router'

import { GET_ANIME_PAGE } from '../graphql/queries/getAnimePage'

export const useAnimePage = () => {

    let value = {}
    let history = useHistory()
    let pathname = history.location.pathname
    let title = pathname.replace('/search/anime/', '')

    //определение текущего сезона
    let date = new Date()
    let currentMonth = date.getMonth() + 1
    let season = ''
    if (currentMonth >= 0 && currentMonth <=3) {
      season = 'WINTER'
    } else if (currentMonth >= 4 && currentMonth <= 6) {
      season = 'SPRING'
    } else if (currentMonth >= 7 && currentMonth <= 9) {
      season = 'SUMMER'
    } else if (currentMonth >= 10 && currentMonth <= 12) {
      season = 'FALL'
    }

    //определение текущей страницы
    if (pathname.includes('trending')) {
      value = {
        "page": 1,
          "type": "ANIME",
          "sort": [
            "TRENDING_DESC",
            "POPULARITY_DESC"
          ]
      }
    } else if (pathname.includes('this-season')) {
      value = {
        "page": 1,
        "type": "ANIME",
        "seasonYear": date.getFullYear(),
        "season": season
      }
    } else if (pathname.includes('next-season')) {
      let nextYear = date.getFullYear()
      let nextSeason = ''

      //определение следующего сезона
      if (season === 'WINTER') {
        nextSeason = 'SPRING'
      } else if (season === 'SPRING') {
        nextSeason = 'SUMMER'
      } else if (season === 'SUMMER') {
        nextSeason = 'FALL'
      } else if (season === 'FALL') {
        nextSeason = 'WINTER'
        nextYear = date.getFullYear() + 1
      }

      value = {
        "page": 1,
        "type": "ANIME",
        "seasonYear": nextYear,
        "season": nextSeason
      }
    } else if (pathname.includes('popular')) {
      value = {
        "page": 1,
        "type": "ANIME",
        "sort": "POPULARITY_DESC"
      }
    } else if (pathname.includes('top-100')) {
      value = {
        "page": 1,
        "type": "ANIME",
        "sort": "SCORE_DESC"
      }
    }

    const {loading: animeLoading, error: animeError, data: animeTrending, fetchMore, networkStatus} = useQuery(GET_ANIME_PAGE, {
        variables: value,
        notifyOnNetworkStatusChange: true
    })

    return {animeLoading, animeError, animeTrending, fetchMore, title, value}
}