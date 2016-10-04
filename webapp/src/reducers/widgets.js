import { widgets } from '../commons/action-types';
import { createReducer } from '../utils/reducer-creator';

const initialState = {
	isLoading: false
};

export default {
	initialState: initialState,

	reducer: createReducer(initialState, {
		/***
		 * load
		 */
		[widgets.LOAD_REQUEST](state) {
			return {
				...state,
				isLoading: true
			};
		},
		[widgets.LOAD_SUCCESS](state) {
			return {
				...state,
				isLoading: false
			};
		}
	})
};