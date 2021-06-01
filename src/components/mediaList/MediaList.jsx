import React from 'react'
import { NavLink } from 'react-router-dom'

import s from './MediaList.module.sass'
import { listLinks, listTitles } from './utils'
import { installRareIcon } from '../../utils/utils'

import Card from '../../components/card/Card'
import CardSkeleton from '../skeleton/card/CardSkeleton'
import CardTableSkeleton from '../skeleton/cardTable/CardTableSkeleton'

const MediaList = ({animeTrends, loading}) => {
    const titles = ['trending', 'season', 'nextSeason', 'popular', 'top']

    return (
        <>
            {
                titles.map((title, i) => {
                    return (
                        <div key={title} className={`${s.landingSection}`}>
                            <NavLink to={`/search/anime/${listLinks(title)}`} className={s.titleWrap}>
                                <h2 className={s.title}>{listTitles(title)}</h2>
                                <div className={s.expand}>View All</div>
                            </NavLink>
                            <div>
                                {
                                    title !== 'top'
                                    ? ( 
                                        <div className={s.results}>
                                            {animeTrends && Object.values(animeTrends)[i].media.map(elem => {
                                            })}
                                            {(loading && <CardSkeleton />) || Object.values(animeTrends)[i].media.map(({id, coverImage, title, averageScore, episodes, genres, season, startDate, studios, format}, i) => {
                                                return (
                                                    <Card key={id} url='/anime/' id={id} coverImage={coverImage} title={title} averageScore={averageScore} episodes={episodes} genres={genres} season={season} date={startDate.year} studios={studios.edges[0].node.name ? studios.edges[0].node.name : ''} format={format} index={i}/>   
                                                )
                                            })}  
                                        </div>
                                    ) 
                                    : (
                                        <div className={s.resultTable}>
                                            {(loading && <CardTableSkeleton />) || Object.values(animeTrends)[i].media.map(({id, coverImage, title, genres, averageScore, popularity, format, episodes, startDate, status}, i) => {
                                                return (
                                                    <div key={id} className={s.topCardWrap}>
                                                        <div className={s.topCard}>
                                                            <div className={s.rankCard}>#{i+1}</div>
                                                            <div className={s.leftTopCard}>
                                                                <NavLink className={s.topImageLink} to={`/anime/${id}`}>
                                                                    <img className={s.topImage} src={coverImage.extraLarge} alt={title.english || title.userPreferred}/>
                                                                </NavLink>
                                                                <div className={s.topCardTitle}>
                                                                    <NavLink className={s.topTitleLink} to={`/anime/${id}`}>{title.english || title.userPreferred}</NavLink>
                                                                    <div className={s.genres}>
                                                                        {
                                                                            genres.map(genre => {
                                                                                return <NavLink key={genre} className={s.genre} to={`/anime`}>{genre}</NavLink>
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={s.rightTopCard}>
                                                                <div className={s.score}>
                                                                    <div className={s.percentWrap}>
                                                                        {   
                                                                            installRareIcon(averageScore, s.scoreSmile)
                                                                        }
                                                                        <div className={s.percent}>{averageScore}%</div>
                                                                    </div>
                                                                    <div className={s.popularity}>{popularity} users</div>
                                                                </div>
                                                                <div className={s.formatWrap}>
                                                                    <div className={s.format}>{format}</div>
                                                                    <div className={s.length}>{episodes} episodes</div>
                                                                </div>
                                                                <div className={s.dateWrap}>
                                                                    <div className={s.date}>{startDate.year}</div>
                                                                    <div className={s.status}>{status.toLowerCase()}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}  
                                        </div>
                                    )
                                }
                                
                            </div>
                        </div>
                    )
                })
            }
        </>

    )
}

export default MediaList
