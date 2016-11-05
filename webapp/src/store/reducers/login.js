import { login } from '../action-types';
import { createReducer } from '../../utils/reducer-creator';

const initialState = {
	isLoading: false,
	response: undefined,
	error: undefined
};

export default {
	initialState: initialState,

	reducer: createReducer(initialState, {
		/***
		 * login
		 */
		[login.LOGIN_REQUEST](state) {
			return {
				...state,
				isLoading: true
			};
		},
		[login.LOGIN_SUCCESS](state, action) {
			return {
				...state,
				response: action.result
			};
		},
		[login.LOGIN_FAILURE](state, action) {
			return {
				...state,
				isLoading: false,
				error: action.result
			};
		}
	})
};