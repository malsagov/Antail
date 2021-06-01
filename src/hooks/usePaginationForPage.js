import React, { useEffect, useState } from 'react'

export const usePaginationForPage = (filterAnimeData, fetchMore, value) => {

    //переключатель для получения новой порции данных
    const [fetching, setFetching] = useState(false)
    const [isEndPage, setIsEndPage] = useState(false)

    //текущая страница
    const [currentPage, setCurrentPage] = useState(1)

    //пагинация
    useEffect( () => {
        if (fetching) {
          if (filterAnimeData && filterAnimeData.Page.pageInfo.hasNextPage){
            fetchMore({
              variables: {
                ...value,
                page: currentPage + 1
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
            setFetching(false)
          } else {
            setCurrentPage(1)
          }
        }
    }, [fetching])

      const onPagination = () => {
        setFetching(true)
        if (filterAnimeData && filterAnimeData.Page.pageInfo.currentPage + 1 === filterAnimeData.Page.pageInfo.lastPage){
          setIsEndPage(true)
        }
      }

      return {onPagination, isEndPage}
}