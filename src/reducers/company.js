import {
	GET_COMPANIES,
	GET_COMPANIES_ERROR,
	GET_CURRENT_PROFILE_COMPANY,
	GET_CURRENT_PROFILE_COMPANY_ERROR,
	UPDATE_PROFILE_COMPANY,
	UPDATE_PROFILE_COMPANY_ERROR,
	DELETE_COMPANY,
	DELETE_COMPANY_ERROR
} from '../actions/types'
const initialState = {
	companies: {},
	company: {},
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
		case GET_COMPANIES:
			return {
				...state,
				engineers: payload
			}
		case GET_COMPANIES_ERROR:
			return {
				...state,
				error: payload
			}
		case GET_CURRENT_PROFILE_COMPANY:
			return {
				...state,
				companies: payload
			}
		case GET_CURRENT_PROFILE_COMPANY_ERROR:
			return {
				...state,
				error: payload
			}
		case UPDATE_PROFILE_COMPANY:
	      	return {
	        	...state,
	        	companies: [payload, ...state.companies]
			}
		case UPDATE_PROFILE_COMPANY_ERROR:
			return {
				...state,
				error: payload
			}
		case DELETE_COMPANY:
			return {
				...state,
				companies: state.companies.filter(company => company.id !== payload)
			}
		case DELETE_COMPANY_ERROR:
			return {
				...state,
				error: payload
			}
		default:
			return state
	}
}
