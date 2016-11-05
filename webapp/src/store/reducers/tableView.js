import { tableview } from '../commons/action-types';
import { createReducer } from '../utils/reducer-creator';

const initialState = {};

export default {
	initialState: initialState,

	reducer: createReducer(initialState, {

		[tableview.DATA_REQUEST](state, action) {
			const tmp = {};
			tmp[action.id] = {
				isLoading: true
			};
			return Object.assign({}, state, tmp);
		},

		[tableview.DATA_SUCCESS](state, action) {
			const tmp = {};
			tmp[action.id] = {
				isLoading: false,
				currentPage: action.currentPage,
				queryParams: action.queryParams,
				result: action.result
			};
			return Object.assign({}, state, tmp);
		},

		[tableview.DATA_FAILURE](state, action) {
			const tmp = {};
			tmp[action.id] = {
				isLoading: false,
				currentPage: action.currentPage,
				queryParams: action.queryParams,
				error: action.result
			};
			return Object.assign({}, state, tmp);
		}
	})
};
