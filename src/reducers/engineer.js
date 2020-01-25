import {
	GET_ENGINEERS,
	GET_ENGINEERS_ERROR,
	GET_CURRENT_PROFILE_ENGINEER,
	GET_CURRENT_PROFILE_ENGINEER_ERROR,
	UPDATE_PROFILE_ENGINEER,
	UPDATE_PROFILE_ENGINEER_ERROR,
	DELETE_ENGINEER,
	DELETE_ENGINEER_ERROR
} from '../actions/types'
const initialState = {
	engineers: {},
	engineer: {},
	error: {},
	loading: true,
	search: '',
	sort: 'DESC',
	sortBy: 'date_updated',
	limit: '10',
	page: '1'
}
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
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
		case UPDATE_PROFILE_ENGINEER:
	      	return {
	        	...state,
	        	engineers: state.engineers.concat(payload)
			}
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
