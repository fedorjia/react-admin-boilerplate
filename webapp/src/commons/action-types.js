/***
 * action types
 *
 * each of type will be exported
 *
 * 		user.LOAD will generate: USER_LOAD
 * important:
 * 		_{type}_ , this will generate four action types, for example:
 * 	    user._LOAD_, will generate: USER_LOAD, USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOAD_FAILURE
 */

import { createActionType } from 'action-types-creator';

const types = {
	root: [ 'CLEAR_ALL_STATE', 'CLEAR_VIEW_STATE' ],
	tableview: [ '_DATA_' ],
	login: ['_LOGIN_'],
	simpleForm: ['_SUBMIT_'],
	widgets: ['_LOAD_']
};

const o = createActionType(types);
for(const item in o) {
	exports[item] = o[item];
}
