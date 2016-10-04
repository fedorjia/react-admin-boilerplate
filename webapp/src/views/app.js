import {Component, PropTypes} from 'react';

import Alert from './widgets/Alert';
import Confirm from './widgets/Confirm';
import Prompt from './widgets/Prompt';
import Notifier from './widgets/Notifier';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AppSidebar from './components/AppSidebar';
import Home from './Home';
//import { browserHistory } from 'react-router';

class App extends Component {

	componentDidMount() {
		APP.refs.alert = this.refs.alert;
		APP.refs.confirm = this.refs.confirm;
		APP.refs.prompt = this.refs.prompt;
		APP.refs.notifier = this.refs.notifier;
	}

	render() {
		const {children} = this.props;
		const props = {
			publics: APP.menus.publics,
			privates: APP.menus.privates
		};
		
		return (
				<div className="wrapper">
					<AppHeader/>
					<AppSidebar { ...props }/>
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

App.propTypes = {
	children: PropTypes.node // Injected by React Router
};
//
//function mapStateToProps() {
//	return {};
//}

export default App;