import types from '../actions/types'


const dateData = (state = null, action) => {
    if(action.type === types.GET_DETAILED_REPLAYS_COMPLETE){
        return action.payload
        
    }
    return state
}

export default dateData