import {
	GET_COMPANIES,
	GET_COMPANY,
	ADD_COMPANY,
	UPDATE_COMPANY,
	COMPANY_ERROR,
	DELETE_COMPANY
} from '../actions/types'

const initialState = {
	companies: [],
	company: null,
	loading: true,
	error: {}
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
		case GET_COMPANY:
	      	return {
	        	...state,
	        	company: payload,
	        	loading: false
	      	}
		case ADD_COMPANY:
	      	return {
	        	...state,
	        	companies: payload,
	        	loading: false
	      	}
		case UPDATE_COMPANY:
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
		case DELETE_COMPANY:
			return {
				...state,
				companies: state.companies.filter(company => company.id !== payload),
				loading: false
			}
		default:
			return state
	}
}
