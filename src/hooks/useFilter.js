import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { parse } from 'query-string'
import { useLocation } from 'react-router'

import { FILTER_ANIME } from '../graphql/queries/filterAnime'

export const useFilter = (search) => {
    const location = useLocation()
    //фильтры из query запроса поисковой строки
    const searchUrlQuery = parse(location.search)

    //переключатель для блока с трендами и фильтрованными данными
    const [isFilter, setIsFilter] = useState(false)
    
    const [getSearchingAnime, {fetchMore, loading: filterAnimeLoading, data: filterAnimeData }] = useLazyQuery(FILTER_ANIME, {
        skip: !!searchUrlQuery.search
    })

    //получение данных с сервера и включение|выключение блока с полученными данными
    useEffect(() => {
        if(searchUrlQuery.search) {
          getSearchingAnime({
                variables: {
                page: 1,
                type: "ANIME",
                search: searchUrlQuery.search,
                sort: "SEARCH_MATCH"
                }
            })
            setIsFilter(true)
        } else {
            setIsFilter(false) 
        }
      }, [searchUrlQuery.search])

    return [fetchMore && fetchMore, filterAnimeLoading, filterAnimeData, isFilter]
}