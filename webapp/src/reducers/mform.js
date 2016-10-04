import { form } from '../commons/action-types';
import { createReducer } from '../utils/reducer-creator';

const initialState = {
	isLoading: false,
	response: undefined,
	error: undefined
};

export default {
	initialState: initialState,

	reducer: createReducer(initialState, {
		/***
		 * submit
		 */
		[form.SUBMIT_REQUEST](state) {
			return {
				...state,
				isLoading: true
			};
		},
		[form.SUBMIT_SUCCESS](state, action) {
			return {
				...state,
				isLoading: false,
				response: action.result
			};
		},
		[form.SUBMIT_FAILURE](state, action) {
			return {
				...state,
				isLoading: false,
				error: action.result
			};
		}
	})
};