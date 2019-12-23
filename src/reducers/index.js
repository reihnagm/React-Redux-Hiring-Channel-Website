import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import engineer from './engineer'

export default combineReducers({
    alert,
    auth,
    engineer
});
