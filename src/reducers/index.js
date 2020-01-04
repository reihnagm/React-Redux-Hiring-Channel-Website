import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import engineer from './engineer'
import company from './company'

export default combineReducers({
    alert,
    auth,
    engineer,
    company
})
