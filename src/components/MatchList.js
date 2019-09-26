import React from 'react'
import { useSelector } from 'react-redux'
import MatchItem from './MatchItem'
import '../css/matchList.css'

const MatchList = props => {
    const data = useSelector(state => state.detailedData)

    const mapData = () => {
        if(data === null){
        }
        else{
            return data.map(e => {
                return(
                    <MatchItem item={e} key={e.id}/>
                )
            })
        }
    }

    return (
        <ul className='matchList'>
            {mapData()}
        </ul>
    )
}

export default MatchList