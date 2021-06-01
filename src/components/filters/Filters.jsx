import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { parse } from 'query-string'

import s from './Filters.module.sass'

const Filters = () => {

    //значение поискового фильтра из query строки
    const [searchValue, setSearchValue] = useState('')
    const [isSecondaryFilters, setIsSecondaryFilters] = useState(false)

    const history = useHistory()
    const filterUrlQuery = parse(history.location.search)
    
    //установка фильтров из query строки
    useEffect(() => {

      if (filterUrlQuery.search) {
        setSearchValue(filterUrlQuery.search)
      }

    }, [filterUrlQuery.search])

    useEffect(() => {
      if (!searchValue) {
        setIsSecondaryFilters(false)
        history.push({
          pathname: history.pathname
        })
        return 
      }
      setIsSecondaryFilters(true)
      history.push({
        search: `?search=${searchValue}`
      })
    }, [searchValue, history])
    
    const onSearchValue = (e) => {
      setSearchValue(e.target.value)
    }

    //удаление поискового тэга из доп. панели фильтров
    const deleteSearchFilter = () => {
      setSearchValue('')
    }

    //удаление genres тэга из доп. панели фильтров
    // const deleteActiveTagFilter = (tag) => {
    //   if (activeTags.includes(tag)){
    //     //определение порядкового индекса тэга в массиве всех тэгов по его значению
    //     let indexOfTheClikedTag = [...getFiltersData.genres, ...getFiltersData.tags].indexOf(tag)

    //     setActiveTags(activeTags.filter(g => g !== tag))
    //     setOptionNumber(optionNumber.filter(n => n !== indexOfTheClikedTag))
    //   }
    // }
    
    //переключатель(вкл/выкл) Genre фильтра
    // const activeOption = (genre, i) => {
    //   if (activeTags.includes(genre)) {
    //     setActiveTags(activeTags.filter(g => g !== genre))
    //     setOptionNumber(optionNumber.filter(n => n !== i))
    //     return 
    //   } 

    //   setActiveTags([...activeTags, genre])
    //   setOptionNumber([...optionNumber, i])
    // }
    
    //переключатель(вкл/выкл) для списка Genres
    // const activeOptionList = () => {
    //   setIsOptionList(!isOptionList)
    // }
    
    //добавление классов для списка опшинов Genres
    // const optionsClasses = cn({
    //   [s.options]: true,
    //   [s.optionsActive]: isOptionList
    // })
    
    return (
      <div className={s.filtersWrap}>
        <div className={s.filters}>
          <div className={s.filter}>
            <div className={s.name}>Search</div>
            <div className={s.searchWrap}>
              <svg
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={s.icon}
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
              <input autoComplete="off" type="search" className={s.search} value={searchValue} onChange={onSearchValue}/>
            </div>
          </div>
          {/* <div className={s.filter}>
            <div className={s.name}>Genres</div>
            <div className={s.selectWrap}>
              <div className={s.select} onClick={activeOptionList}>
                <div className={s.valueWrap}>
                  {
                    activeTags.length ? (
                      <div className={s.tags}>
                        <div className={s.tag}>{activeTags[0]}</div>
                        {
                          activeTags.length > 1 && (
                            <div className={s.tag}>+{activeTags.length - 1}</div>
                          )
                        }
                      </div>
                    )
                    : (
                      <div className={s.placeholder}>Any</div>
                    )
                  }
                </div>
                <svg className={s.selectIcon} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" ></path></svg>             
              </div>
              <div className={s.options}>
                <section className={s.scrollWrap}>
                  <div className={s.optionGroup}>
                    <div className={s.optionTitle}>Genres</div>
                    {
                      getFiltersLoading ? <div>Loading...(Filter)</div> 
                      : ( 
                        getFiltersData.genres.map((genre, i) => {
                          return(
                            <div onClick={() => activeOption(genre, i)} className={s.option} key={genre}>
                              <div className={s.optionLabel}>
                                <div className={s.optionName}>{genre}</div>
                                
                                <div className={`${s.selectedIconWrap} ${optionNumber.includes(i) ? s.optionActive : ''} `}>
                                  <svg className={s.selectedIcon} focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" ></path></svg>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      )
                    }
                  </div>
                </section>
              </div>
            </div>
          </div>*/}
        </div> 
        { isSecondaryFilters ? (
            <div className={s.secondaryFilters}>
                <div className={s.activeFilters}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className={s.secondaryFiltersIcon}
                    >
                    <path
                        fill="currentColor"
                        d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z"
                    ></path>
                    </svg>
                    { searchValue && (
                        <div className={s.secondFilter}>
                            <span className={s.label}>Search: {searchValue}</span>
                            <svg onClick={deleteSearchFilter} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" className={s.closeIcon}><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                        </div>
                    )}
                    {/* {
                      activeTags && (
                        activeTags.map(tag => {
                          return (
                            <div className={s.secondFilter} key={tag}>
                              <span className={s.label}>{tag}</span>
                              <svg onClick={() => deleteActiveTagFilter(tag)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" className={s.closeIcon}><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                            </div>
                          )
                        })
                      )
                    } */}
                </div>
            </div>
        )
        : (
          <div className={s.secondaryFiltersFalse}></div>
        )
      }
      </div>
    );
}

export default Filters
