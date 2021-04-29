import React, { Fragment, useRef } from 'react'

import parse from 'react-html-parser'

const Overview = ({about}) => {


    return (
        <div>
            <div className="test">{about}</div>
        </div>
    )
}

export default Overview
