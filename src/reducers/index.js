import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import alert from './alert';
import auth from './auth';
import engineer from './engineer';
import company from './company';
const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  alert,
  auth,
  engineer,
  company
})
export default createRootReducer
