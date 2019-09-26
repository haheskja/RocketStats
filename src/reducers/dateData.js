import types from '../actions/types'


const dateData = (state = null, action) => {
    if(action.type === types.DATE_REPLAYS){
        return {
            ...state,
            dateData: action.payload
        }
    }
    return state
}

export default dateData