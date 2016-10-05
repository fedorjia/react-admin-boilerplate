import {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import Alert from './widgets/Alert';
import Confirm from './widgets/Confirm';
import Prompt from './widgets/Prompt';
import Notifier from './widgets/Notifier';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AppSidebar from './components/AppSidebar';
import Home from './Home';

class App extends Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		children: PropTypes.node // Injected by React Router
	};

	componentDidMount() {
		APP.refs.alert = this.refs.alert;
		APP.refs.confirm = this.refs.confirm;
		APP.refs.prompt = this.refs.prompt;
		APP.refs.notifier = this.refs.notifier;
	}

	render() {
		const {children, dispatch} = this.props;
		return (
				<div className="wrapper">
					<AppHeader dispatch={ dispatch }/>
					<AppSidebar publics={ APP.menus.publics } privates={ APP.menus.privates }/>
					<div className="content-wrapper">
						{ this.renderChildren(children) }
					</div>
					<AppFooter/>

					<Alert ref="alert"/>
					<Confirm ref="confirm"/>
					<Prompt ref="prompt"/>
					<Notifier ref="notifier"/>
				</div>
		);
	}

	renderChildren(children) {
		return children || <Home/>;
	}
}

function mapStateToProps() {
	return {};
}

export default connect(mapStateToProps)(App);