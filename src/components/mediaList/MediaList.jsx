import React from 'react'
import { NavLink } from 'react-router-dom'

import s from './MediaList.module.sass'
import { listLinks, listTitles } from './utils'

import Card from '../../components/card/Card'

const MediaList = ({animeTrends}) => {
    // console.log(Object.entries(animeTrends))
    return (
        <>
            {
                Object.entries(animeTrends).map((trend, i) => {
                    return(
                        <div key={trend[0]} className={`${s.landingSection}`}>
                            <NavLink to={`/anime/${listLinks(trend[0])}`} className={s.titleWrap}>
                                <h2 className={s.title}>{listTitles(trend[0])}</h2>
                                <div className={s.expand}>View All</div>
                            </NavLink>
                            <div>
                                {
                                    trend[0] !== 'top'
                                    ? (
                                        <div className={s.results}>
                                        { trend[1].media.map(({id, coverImage, title}) => {
                                            return (
                                                <Card key={id} url='/anime/' id={id} coverImage={coverImage} title={title}/>
                                            )
                                        })}
                                    </div>
                                    ) 
                                    : (
                                        <div className={s.resultsTable}>
                                            { trend[1].media.map(({id, coverImage, title, genres, averageScore, popularity, format, episodes, startDate, status}, i) => {
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
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className={s.scoreSmile}><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"></path></svg>
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
