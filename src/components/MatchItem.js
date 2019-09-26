import React from 'react'
import '../css/matchList.css'

const MatchTeamContent = ({item, color}) => {
    return (
        <div className='teamContent'>
            <span className={'matchScore ' + color}>{Number.isInteger(item[color].stats.core.goals) ? (item[color].stats.core.goals) : 0 }</span>
            <div className={'matchPlayers'}>
                <table className="matchTable">
                    <thead>
                    <tr>
                        <th>Player name</th>
                        <th>BPM</th>
                        <th>Speed %</th>
                        <th>Supersonic speed</th>
                        <th>Boost speed %</th>
                        <th>Slow speed %</th>
                    </tr>
                    </thead>
                    <tbody>
                        {item[color].players.map(player => {
                            return (
                                <tr key={player.name}>
                                    <td>{player.name}</td>
                                    <td>{player.stats.boost.bpm}</td>
                                    <td>{(player.stats.movement.avg_speed_percentage).toFixed(2)} %</td>
                                    <td>{(player.stats.movement.percent_supersonic_speed).toFixed(2)} %</td>
                                    <td>{(player.stats.movement.percent_boost_speed).toFixed(2)} %</td>
                                    <td>{(player.stats.movement.percent_slow_speed).toFixed(2)} %</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
} 

const MatchItem = ({item}) => {
    return (
        <li className='matchItem' >
            <div className='matchHeader'>
                <h5>{item.title}</h5>
                <span className='infoText'>Season {item.season}</span>
                <span className='infoText'>{item.playlist_name}</span>
                <span className='infoText'>{item.date}</span>
            </div>
            <div className='matchContent'>
                <MatchTeamContent item={item} color='blue'/>
                <MatchTeamContent item={item} color='orange'/>
            </div>
        </li>
    )
}

export default MatchItem