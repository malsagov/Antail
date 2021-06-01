import React from 'react'

import s from './Anime.module.sass'

import MediaList from '../../components/mediaList/MediaList'
import Filters from '../../components/filters/Filters'
import Card from '../../components/card/Card'
import { useAnimeTrends } from '../../hooks/useAnimeTrends'
import { useFilter } from '../../hooks/useFilter'
import { usePagination } from '../../hooks/usePagination'
import CardSkeleton from '../../components/skeleton/card/CardSkeleton'

const Anime = () => {
    
    //получение текущих аниме трендов
    const { animeLoading, animeError, animeTrends } = useAnimeTrends()

    //получение методов для фильтрации и фильрованных данных
    const [ fetchMore, filterAnimeLoading, filterAnimeData, isFilter ] = useFilter()
  
    //пагинация
    usePagination(filterAnimeData, isFilter, fetchMore)
    
    if(animeError) return <div>Some error happend...</div>
    
    return (
      <div className={s.anime}>
        <div className="container">
          <Filters />
          <div className={s.searchLanding}>
              {
                isFilter 
                ? (
                    <>
                    <div className={s.results}>
                      {filterAnimeLoading && <CardSkeleton /> || filterAnimeData && filterAnimeData.Page.media.map(({id, coverImage, title, averageScore, episodes, genres, season, startDate, studios, format}, i) => {
                          return (
                            <Card key={id} url='/anime/' coverImage={coverImage} title={title} averageScore={averageScore} episodes={episodes} genres={genres} season={season} date={startDate.year} studios={studios.edges[0] ? studios.edges[0].node.name : ''} format={format} index={i}/>
                          )
                        })
                      }
                    </div>
                    {filterAnimeData && (!filterAnimeData.Page.pageInfo.total && <div className={s.noResult}>No Results</div>)}
                    </>
                ) 
                : (
                  <MediaList animeTrends={animeTrends} loading={animeLoading}/>
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