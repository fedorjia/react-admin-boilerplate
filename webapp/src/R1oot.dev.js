import { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from './routes';
import DevTools from './DevTools1';
import { Router } from 'react-router';


class Root extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	render() {
		const { store, history } = this.props;
		return (
			<Provider store={store}>
				<div>
					<Router history={history} routes={routes} />
					{ /*<DevTools />*/ }
				</div>
			</Provider>
		);
	}
}

export default Root;