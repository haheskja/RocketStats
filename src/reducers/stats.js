import types from '../actions/types'


const stats = (state = null, action) => {
    if(action.type === types.GET_STATS){
        return action.payload
    }
    return state
}

export default stats