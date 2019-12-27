import {
	GET_ENGINEERS,
	GET_ENGINEER,
	ADD_ENGINEER,
	UPDATE_ENGINEER,
	ENGINEER_ERROR,
	DELETE_ENGINEER
} from '../actions/types'

const initialState = {
	engineers: [],
	engineer: null,
	search: '',
	sortBy: 'date_updated',
	sort: 'ASC',
	limit: 5,
	loading: true,
	error: {}
}

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_ENGINEERS:
			return {
				...state,
				engineers: payload,
				loading: false
			}
		case GET_ENGINEER:
	      	return {
	        	...state,
	        	engineer: payload,
	        	loading: false
	      	}
		case ADD_ENGINEER:
	      	return {
	        	...state,
	        	engineers: payload,
	        	loading: false
	      	}
		case UPDATE_ENGINEER:
	      	return {
	        	...state,
	        	engineers: payload,
	        	loading: false
	      	}
		case DELETE_ENGINEER:
			return {
				...state,
				engineers: state.engineers.filter(engineer => engineer.id !== payload),
				loading: false
			}
		case ENGINEER_ERROR:
			return {
				...state,
				engineers: payload,
				loading: false
			}
		default:
			return state
	}
}