/**
 * api middleware
 */
export function api({ dispatch, getState }) {
	return next => action => {
		const {
			actionType,
			callAPI,
			shouldCallAPI = () => true,
			payload = {}
		} = action;

		if (!actionType) {
			// Normal action: pass it on
			return next(action);
		}

		// if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
		// 	throw new Error('Expected an array of three string types.');
		// }

		if (typeof callAPI !== 'function') {
			throw new Error('Expected fetch to be a function.');
		}

		if (!shouldCallAPI(getState())) {
			return;
		}

		dispatch(Object.assign({}, payload, {
			type: actionType + '_REQUEST'
		}));

		return callAPI().then(
			(result) => {
				dispatch(Object.assign({}, payload, {
					type: actionType + '_SUCCESS',
					result: result
				}));
			},
			(error) => {
				dispatch(Object.assign({}, payload, {
					type: actionType + '_FAILURE',
					result: error
				}));
			}
		);
	};
}