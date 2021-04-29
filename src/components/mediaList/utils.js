export const listTitles = (title) => {
    switch (title) {
        case 'trending':
            return 'Trending now'
        case 'season': 
            return 'Popular this season'
        case 'nextSeason':
            return 'Upcoming next season'
        case 'popular':
            return 'All time popular'
        case 'top':
            return 'Top 100 anime'
        default:
            return title
    }
}

export const listLinks = (title) => {
    switch (title) {
        case 'trending':
            return 'trending'
        case 'season': 
            return 'this-season'
        case 'nextSeason':
            return 'next-season'
        case 'popular':
            return 'popular'
        case 'top':
            return 'top-100'
        default:
            return title
    }
}