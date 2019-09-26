import React from 'react'
import { useSelector } from 'react-redux'

const Stats = props => {
    const stats = useSelector(state => state.stats)

    if(stats === null) return "Generate some stats first"

    return(
        <div>
            <h4>These are your average stats across all the games.</h4>
            <dl>
                <dt>Number of games</dt>
                <dd>{stats.number}</dd>
                <dt>Boost per minute</dt>
                <dd>{stats.bpm}</dd>
                <dt>Speed</dt>
                <dd>{stats.speed} %</dd>
                <dt>Slow speed</dt>
                <dd>{stats.slowSpeed} %</dd>
                <dt>Boost speed</dt>
                <dd>{stats.boostSpeed} %</dd>
                <dt>Supersonic speed</dt>
                <dd>{stats.supersonicSpeed} %</dd>
            </dl>
        </div>
    )
}

export default Stats