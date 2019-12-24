import {
	GET_COMPANIES,
	COMPANY_ERROR
} from '../actions/types'

const initialState = {
	companies: [],
	loading: true
}

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_COMPANIES:
			return {
				...state,
				companies: payload,
				loading: false
			}
		case COMPANY_ERROR:
			return {
				...state,
				companies: payload,
				loading: false
			}
		default:
			return state
	}
}
