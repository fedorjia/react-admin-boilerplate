import { list } from '../commons/action-types';
import { createReducer } from '../utils/reducer-creator';

const initialState = {
	isLoading: false,
	error: undefined
};

export default {
	initialState: initialState,

	reducer: createReducer(initialState, {

	})
};