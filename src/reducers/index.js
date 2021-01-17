import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import alert from "./alert"
import auth from "./auth"
import engineer from "./engineer"
import company from "./company"
import skill from "./skill"
import message from "./message"

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    alert,
    auth,
    engineer,
    company,
    message,
    skill
  })
export default createRootReducer
