import { simpleForm } from '../commons/action-types';
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
		[simpleForm.SUBMIT_REQUEST](state) {
			return {
				...state,
				isLoading: true
			};
		},
		[simpleForm.SUBMIT_SUCCESS](state, action) {
			return {
				...state,
				isLoading: false,
				response: action.result
			};
		},
		[simpleForm.SUBMIT_FAILURE](state, action) {
			return {
				...state,
				isLoading: false,
				error: action.result
			};
		}
	})
};