import {
	GET_ENGINEERS,
	ENGINEER_ERROR,
	DELETE_ENGINEER
} from '../actions/types'

const initialState = {
	engineers: [],
	loading: true
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
		case ENGINEER_ERROR:
			return {
				...state,
				engineers: payload,
				loading: false
			}
		case DELETE_ENGINEER:
			return {
				...state,
				loading: false
			}
		default:
			return state
	}
}
