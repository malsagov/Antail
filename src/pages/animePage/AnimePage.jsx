import { useQuery } from '@apollo/client'
import React from 'react'

import s from './AnimePage.module.sass'

import {GET_ANIME} from '../../graphql/queries/getAnime'
import { useParams } from 'react-router'

const AnimePage = () => {

    const params = useParams()

    const {loading, error, data} = useQuery(GET_ANIME, {
        variables: {
            id: params.slug,
            type: 'ANIME'
        }
    })

    if (loading) return null

    return (
        <div className={s.animePageWrap}>
            <div className={s.banner} style={{background: `url(${data.Media.bannerImage})`, backgroundColor: '#fff', backgroundPosition: '50% 35%', backgroundRepeat: 'no-repeat' , backgroundSize: 'cover'}}>
                {
                    data.Media.bannerImage && <div className={s.shadow}></div>
                } 
            </div>
            <div className="container">
                <div className={s.animePage}>
                    <div className={s.coverWrap}>
                        <img src={data.Media.coverImage.extraLarge} alt="" className={s.animeImg} />
                        <div className={s.stats}>
                            <div className={s.stat}>
                                <div className={s.statTitle}>Format</div>
                                <div className={s.statData}>{data.Media.format}</div>
                            </div>
                            <div className={s.stat}>
                                <div className={s.statTitle}>Episode Duration</div>
                                <div className={s.statData}>{data.Media.duration}</div>
                            </div>
                            <div className={s.stat}>
                                <div className={s.statTitle}>Status</div>
                                <div className={s.statData} style={{textTransform: 'capitalize'}}>{data.Media.status.toLowerCase()}</div>
                            </div>
                            <div className={s.stat}>
                                <div className={s.statTitle}>Start Date</div>
                                <div className={s.statData}>{data.Media.startDate.year}</div>
                            </div>
                            <div className={s.stat}>
                                <div className={s.statTitle}>Season</div>
                                <div className={s.statData} style={{textTransform: 'capitalize'}}>{data.Media.season.toLowerCase()}</div>
                            </div>
                            <div className={s.stat}>
                                <div className={s.statTitle}>Average Score</div>
                                <div className={s.statData}>{data.Media.averageScore}%</div>
                            </div>
                            <div className={s.stat}>
                                <div className={s.statTitle}>Mean Score</div>
                                <div className={s.statData}>{data.Media.meanScore}%</div>
                            </div>
                            <div className={s.stat}>
                                <div className={s.statTitle}>Popularity</div>
                                <div className={s.statData}>{data.Media.popularity}</div>
                            </div>
                            <div className={s.stat}>
                                <div className={s.statTitle}>Favorites</div>
                                <div className={s.statData}>{data.Media.favourites}</div>
                            </div>
                            <div className={s.stat}>
                                <div className={s.statTitle}>Source</div>
                                <div className={s.statData} style={{textTransform: 'capitalize'}}>{data.Media.source.toLowerCase()}</div>
                            </div>
                        </div>
                    </div>
                    <div className={s.content}>
                        <h4 className={s.title}>{data.Media.title.english || data.Media.title.userPreferred}</h4>
                        <p className={s.desc} dangerouslySetInnerHTML={{__html: data.Media.description}}></p>
                        {
                            data.Media.characterPreview && (
                                <div className={s.charsctersWrap}>
                                    <h3 className={s.charactersTitle}>Characters</h3>
                                    <div className={s.characters}>
                                        {
                                            data.Media.characterPreview.edges.map(character => {
                                                return (
                                                    <div key={character.id} className={s.characterWrap}>
                                                        <div className={s.character}>
                                                            <img src={character.node.image.large} alt="" className={s.characterImg} />
                                                            <div className={s.characterName}>{character.node.name.full}</div>
                                                        </div>
                                                        <div className={s.actor}>
                                                            <div className={s.actorName}>{character.voiceActors[0] && character.voiceActors[0].name.full}</div>
                                                            <img src={character.voiceActors[0] && character.voiceActors[0].image.large} className={s.actorImg} alt="" />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimePage
