import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import alert from "./alert"
import auth from "./auth"
import engineer from "./engineer"
import message from "./message"
import company from "./company"
const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    alert,
    auth,
    engineer,
    message,
    company
  })
export default createRootReducer
