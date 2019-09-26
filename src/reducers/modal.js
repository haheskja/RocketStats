import types from '../actions/types'


const modal = (state = false, action) => {
    if(action.type === types.GET_REPLAYS){
        return true
    }
    else if(action.type === types.GET_STATS){
        return false
    }
    return state
}

export default modal