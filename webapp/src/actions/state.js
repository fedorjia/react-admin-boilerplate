import { root } from '../commons/action-types';

/***
 * clear all state
 */
export function clearAllState() {
	return {
		type: root.CLEAR_ALL_STATE
	};
}

/***
 * clear one state
 *
 * @param viewName
 *  !important: viewName.lowercaseFirstLetter must be reducer name
 */
export function clearOneState(viewName) {
	return {
		type: root.CLEAR_ONE_STATE,
		reducer: viewName.lowercaseFirstLetter()
	};
}