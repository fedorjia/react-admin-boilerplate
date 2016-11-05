import { widgets } from '../commons/action-types';

/***
 *  load
 */
export const load = () => (dispatch) => {
	dispatch({
		type: widgets.LOAD_REQUEST
	});

	setTimeout(() => {
		dispatch({
			type: widgets.LOAD_SUCCESS
		});
	}, 2000);
};

//export default {
//	load() {
//		mLoad();
//	}
//};