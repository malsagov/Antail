import axios from "axios";

export const userAPI = {
    getUser(userName) {
        const query = 
        `
            {
                User(name: "${userName}"){
                    id
                    name
                    avatar{
                        large
                        medium
                    }
                    bannerImage
                }    
            }
        `
        return axios.post('https://graphql.anilist.co', JSON.stringify({query}), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(res => res.data.data)
    },
    getCurrentUser() {
        const query = 
        `
            {
                Viewer{
                    id
                    name
                    about
                    avatar{
                        large
                        medium
                    }
                }
            }
        `
        return axios.post('https://graphql.anilist.co', JSON.stringify({query}), {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(res => res.data.data)
        
    }
}
