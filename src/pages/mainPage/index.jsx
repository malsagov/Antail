import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {gql, useQuery} from '@apollo/client'
import {stringify, parse} from 'query-string'
import request from 'request'

const MainPage = (props) => {
    // const queryString = stringify({
    //     client_id: '5219',
    //     response_type: 'token'
    // })

    // const accessToken = parse(props.location.hash)
    // console.log(accessToken)
    // if (accessToken.access_token) {
    //     let mutation = `
    //         Mutatuion{
    //           Logout
    //         }
    //     `
    //     axios.post('https://graphql.anilist.co', JSON.stringify({mutation: mutation}), {
    //         headers: {
    //             'Authorization': `Bearer ${accessToken.access_token}`,
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         }
    //     })
    //     .then(res => console.log(res.data))
    // }

    // const EXCHANG_RATES = gql`
    // query GetExchangeRates {
    //     rates(currency: "USD") {
    //         currency
    //         rate
    //     }
    // }`

    // const {loading, error, data} = useQuery(EXCHANG_RATES)

    // if (loading){
    //     return <div>Loading...</div>
    // }
    // if(error) {
    //     return <div>Some error is happened</div>
    // }

    // console.log(data)
    // axios.post('https://kitsu.io/api/oauth/token', JSON.stringify(
    //     {
    //         grant_type: 'password',
    //         username: 'neron.jao.88@mail.ru',
    //         password: 'mal48813' 
    //     }
    // ),
    //  {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(res => console.log(res.data))

    return (
        <div>
            {/* l */}
            {/* <a href={`https://anilist.co/api/v2/oauth/authorize?${queryString}`}>Log in</a> */}
        </div>
    )
}

export default MainPage