import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import { root } from '../commons/action-types';
import tableview from './tableview';
import login from './login';
import list from './list';
import simpleForm from './simple-form';
import widgets from './widgets';

const rawReducers = {
	tableview,
	login,
	list,
	simpleForm,
	widgets
};

const mReducers = {};
for(let prop in rawReducers) {
	mReducers[prop] = rawReducers[prop].reducer;
}

const appReducer = combineReducers({
	routing,
	form: formReducer,
	...mReducers
});

const rootReducer = (state, action) => {
	/**
	 * clear all state
	 */
	if (action.type === root.CLEAR_ALL_STATE) {
		const newState = {};
		for(const prop in mReducers) {
			if(mReducers.hasOwnProperty(prop)) {
				// restore initial state
				newState[prop] = rawReducers[prop].initialState;
			}
		}
		Object.assign(state, { ...newState });
	}

	/**
	 * clear view state
	 */
	if (action.type === root.CLEAR_VIEW_STATE) {
		const newState = {};
		for(const prop in mReducers) {
			if(mReducers.hasOwnProperty(prop)) {
				if(action.reducer === prop) {
					// restore initial state
					newState[prop] = rawReducers[prop].initialState;
					break;
				}
			}
		}
		Object.assign(state, { ...newState });
	}

	return appReducer(state, action);
};

export default rootReducer;
