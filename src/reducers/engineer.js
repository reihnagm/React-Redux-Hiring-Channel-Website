import { LOADING, LOADED, LOADING_MORE_DATA, LOADED_MORE_DATA, GET_ENGINEERS, GET_ENGINEERS_ERROR, GET_MORE_DATA, GET_MORE_DATA_ERROR, GET_CURRENT_PROFILE_ENGINEER, GET_CURRENT_PROFILE_ENGINEER_ERROR, GET_PROFILE_ENGINEER_BY_SLUG, GET_PROFILE_ENGINEER_BY_SLUG_ERROR, UPDATE_PROFILE_ENGINEER, UPDATE_PROFILE_ENGINEER_ERROR, DELETE_ENGINEER, DELETE_ENGINEER_ERROR } from "../actions/types"
const initialState = {
  engineers: [],
  engineer: {},
  error: {},
  loading: false,
  loadingMoreData: true,
  pageN: 1,
  showN: 10,
  filterByN: "latest-update",
  sortN: "newer",
  search: ""
}
export default (state = initialState, action) => {
  const { type, payload } = action
  const { engineers } = state
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case LOADED:
      return {
        ...state,
        loading: false
      }
    case LOADING_MORE_DATA:
      return {
        ...state,
        loadingMoreData: true
      }
    case LOADED_MORE_DATA:
      return {
        ...state,
        loadingMoreData: false
      }
    case GET_ENGINEERS:
      return {
        ...state,
        engineers: payload
      }
    case GET_ENGINEERS_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_MORE_DATA:
      return {
        ...state,
        engineers: [...engineers, ...payload]
      }
    case GET_MORE_DATA_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_CURRENT_PROFILE_ENGINEER:
      return {
        ...state,
        engineer: payload
      }
    case GET_CURRENT_PROFILE_ENGINEER_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_PROFILE_ENGINEER_BY_SLUG:
      return {
        ...state,
        engineer: payload
      }
    case GET_PROFILE_ENGINEER_BY_SLUG_ERROR:
      return {
        ...state,
        error: payload
      }
    case UPDATE_PROFILE_ENGINEER:
      return state
    case UPDATE_PROFILE_ENGINEER_ERROR:
      return {
        ...state,
        error: payload
      }
    case DELETE_ENGINEER:
      return {
        ...state,
        engineers: state.engineers.filter(engineer => engineer.id !== payload)
      }
    case DELETE_ENGINEER_ERROR:
      return {
        ...state,
        error: payload
      }
    default:
      return state
  }
}
