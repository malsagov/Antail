import React from 'react'

import s from '../Anime.module.sass'

import Card from '../../../components/card/Card'
import { usePaginationForPage } from '../../../hooks/usePaginationForPage'
// import { useAnimeThisSeason } from '../../../hooks/useAnimeThisSeason'
import { useAnimePage } from '../../../hooks/useAnimePage'

const Trending = () => {

    //получение текущих трендов 
    // const { animeLoading, animeError, animeTrending, fetchMore: fetchMoreTrending } = useAnimeThisSeason()
    const { animeLoading, animeError, animeTrending, fetchMore: fetchMoreTrending } = useAnimePage()


    //пагинация
    const {onPagination} = usePaginationForPage(animeTrending, fetchMoreTrending)

    return (
        <div className={s.anime}>
        <div className="container">
          <h2 className={s.pageTitle}>Trending anime</h2>
          <div className={s.searchLanding}>
              <>
                <div className={s.results}>
                  {animeTrending && animeTrending.Page.media.map(({id, coverImage, title, averageScore, episodes, genres, season, startDate, studios, format}, i) => {
                      return (
                          <Card key={id} url='/anime/' coverImage={coverImage} title={title} averageScore={averageScore} episodes={episodes} genres={genres} season={season} date={startDate.year} studios={studios.edges[0] && studios.edges[0].node.name} format={format} index={i}/>
                      )
                    })
                  }
                </div>
                <button onClick={onPagination} disabled={animeLoading} className={s.paginationButton}>{animeLoading  ? 'Loading...' : 'Load more'}</button>
              </>
          </div>
        </div>
      </div>
    )
}

export default Trending
