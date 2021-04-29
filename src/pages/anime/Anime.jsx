import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import { parse } from 'query-string'

import { GET_CURRENT_ANIME_TRENDS } from '../../graphql/queries/getCurrentAnimeTrends'
import { FILTER_ANIME } from '../../graphql/queries/filterAnime'

import s from './Anime.module.sass'

import MediaList from '../../components/mediaList/MediaList'
import Filters from '../../components/filters/Filters'
import Card from '../../components/card/Card'

const Anime = () => {
    const location = useLocation()
    //фильтры из query запроса поисковой строки
    const searchUrlQuery = parse(location.search)

    //переключатель для получения новой порции данных
    const [fetching, setFetching] = useState(false)
    //текущая страница
    const [currentPage, setCurrentPage] = useState(1)
    //переключатель для блока с трендами и фильтрованными данными
    const [isFilter, setIsFilter] = useState(false)

    const {loading: animeLoading, error: animeError, data: animeTrends} = useQuery(GET_CURRENT_ANIME_TRENDS, {
        variables: {
            "type": "ANIME",
            "season": "SPRING",
            "seasonYear": 2021,
            "nextSeason": "SUMMER",
            "nextYear": 2021
        }
    })

    const [getSearchingAnime, {fetchMore, loading: filterAnimeLoading, data: filterAnimeData }] = useLazyQuery(FILTER_ANIME, {
      skip: !!searchUrlQuery.search
    })
    
    //получение данных с сервера и включение|выключение блока с полученными данными
    useEffect(() => {
      setIsFilter(false) 
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
      }
    }, [searchUrlQuery.search])


    //слушатель на скролл(для пагинации)
    useEffect(() => {
      document.addEventListener('scroll', scrollHandler)
      return () => {
        document.removeEventListener('scroll', scrollHandler)
      }
    }, [])

    //пагинация
    useEffect(() => {
      if (fetching) {
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
              console.log(fetchMoreResult)
              return fetchMoreResult
            }
          })
          setCurrentPage(prev => prev + 1)
        } else {
          setCurrentPage(1)
        }
        setFetching(false)
      }
    }, [fetching])

    //отслеживание скрола и переключатель пагенации
    const scrollHandler = (e) => {
      if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
        setFetching(true)
      }
    }
    
    if(animeLoading) return <div>Loading...</div>
    if(animeError) return <div>Some error happend...</div>
  
    return (
      <div className={s.anime}>
        <div className="container">
          <Filters />
          <div className={s.searchLanding}>
              {
                isFilter 
                ? (
                    <div className={s.results}>
                      {filterAnimeLoading && <div>Loading...</div>}

                      {filterAnimeData && filterAnimeData.Page.media.map(({id, coverImage, title}) => {
                          return (
                            <Card key={id} url='/anime/' coverImage={coverImage} title={title} />
                          )
                        })
                      }
                      {filterAnimeData && (!filterAnimeData.Page.pageInfo.total && <div>No results</div>)}
                    </div>
                ) 
                : (
                  <MediaList animeTrends={animeTrends}/>
                )
              }
          </div>
        </div>
      </div>
    );
  }
  
  export default Anime
  
  {/* <div className={s.animeBanner}>
    <div className={s.animeBannerShadow}></div>
  </div> */}