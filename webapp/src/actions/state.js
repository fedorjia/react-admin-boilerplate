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
 * clear view state
 *
 * @param viewName
 *  !important: viewName.lowercaseFirstLetter must be equals reducer name
 */
export function clearViewState(viewName) {
	return {
		type: root.CLEAR_VIEW_STATE,
		reducer: viewName.lowercaseFirstLetter()
	};
}