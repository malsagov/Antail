import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'
import { parse } from 'query-string'

export const usePagination = (filterAnimeData, isFilter, fetchMore) => {

    const location = useLocation()
    //фильтры из query запроса поисковой строки
    const searchUrlQuery = parse(location.search)

    //переключатель для получения новой порции данных
    const [fetching, setFetching] = useState(false)
    //текущая страница
    const [currentPage, setCurrentPage] = useState(1)

    //пагинация
    useEffect( () => {
        if (fetching && isFilter) {
          if (filterAnimeData && filterAnimeData.Page.pageInfo.hasNextPage){
            fetchMore({
              variables: {
                page: currentPage + 1,
                type: "ANIME",
                search: searchUrlQuery.search,
                sort: "SEARCH_MATCH"
              },
              updateQuery: (prev, {fetchMoreResult}) => {
                fetchMoreResult.Page.media = [
                  ...prev.Page.media,
                  ...fetchMoreResult.Page.media
                ]
                return fetchMoreResult
              }
            })
            setCurrentPage(prev => prev + 1)
          } else {
            setCurrentPage(1)
          }
          setFetching(false)
        }
    }, [fetching, isFilter])

    //слушатель на скролл(для пагинации)
    useEffect(() => {
        if (isFilter) {
          document.addEventListener('scroll', scrollHandler)
        }
        return () => {
          document.removeEventListener('scroll', scrollHandler)
        }
      }, [isFilter])
  
      //отслеживание скрола и переключатель пагенации
      const scrollHandler = (e) => {
          if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
              setFetching(true) 
          }
      }
}