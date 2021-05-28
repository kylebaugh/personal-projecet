import {createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import glossaryReducer from './glossaryReducer'
import unitReducer from './unitReducer'

const rootReducer = combineReducers({
    authReducer: authReducer,
    glossaryReducer: glossaryReducer,
    unitReducer: unitReducer
})

export default createStore(rootReducer)