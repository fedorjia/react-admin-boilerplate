import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { api } from '../middlewares/api';
import rootReducer from '../reducers';
import DevTools from '../DevTools';

export default function configureStore(initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk, api),
			DevTools.instrument()
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
