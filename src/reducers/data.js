import types from '../actions/types'


const data = (state = null, action) => {
    if(action.type === types.GET_REPLAYS_COMPLETE){
        return action.payload
    }
    return state
}

export default data