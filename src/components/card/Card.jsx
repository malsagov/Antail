import React from 'react'
import { NavLink } from 'react-router-dom'
import { installRareIcon } from '../../utils/utils'

import s from './Card.module.sass'

const Card = ({url, id, coverImage, title, season, date, averageScore, studios, format, episodes, genres, index}) => {
    return (
        <div className={s.card}>
            <NavLink className={s.imageLink} to={`${url}${id}`}>
                <img className={s.image} src={coverImage.extraLarge} alt={title.english || title.userPreferred}/>
            </NavLink>
            <NavLink className={s.cardTitle} to={`${url}${id}`}>{title.english || title.userPreferred}</NavLink>
            <div className={`${s.details} ${index === 5 ? s.right : s.left}`}>
                <div className={s.header}>
                    <div className={s.date}>{season && season.toLowerCase()} {date}</div>
                    {averageScore && <div className={s.rate}>{installRareIcon(averageScore, s.smile)} {averageScore}%</div>}
                </div>
                <div className={s.studios}>{studios && studios.toLowerCase()}</div>
                <div className={s.info}>
                    <div className={s.format}>{format}</div>
                    <div className={s.separator}>•</div>
                    <div className={s.episodes}>{episodes} episodes</div>
                </div>
                <div className={s.tags}>
                    {
                        genres && genres.map((genre, i) => {
                            if (i < 3) {
                                return <div key={genre} className={s.genre}>{genre}</div>
                            } else {
                                return ''
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Card
