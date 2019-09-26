import { combineReducers } from 'redux'
import data from './data'
import stats from './stats'
import dateData from './dateData'
import detailedData from './detailedData'
import modal from './modal'

const rootReducer = combineReducers({
    data, dateData, detailedData, stats, modal
})

export default rootReducer