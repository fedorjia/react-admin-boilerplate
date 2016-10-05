import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { clearViewState } from '../actions/state';
import logoImage from '../../static/images/logo.png';
import Alert from './widgets/Alert';
import { setupApp } from '../commons/index';
import action from '../actions/login';

class Login extends Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		isLoading: PropTypes.bool,
		response: PropTypes.object,
		error: PropTypes.object
	};


	constructor(props) {
		super(props);
	}

	componentWillUnmount() {
		this.props.dispatch(clearViewState(this.constructor.name));
	}

	componentWillReceiveProps(nextProps) {
		// hanlder error
		if(nextProps.error && nextProps.error !== this.props.error) {
			this.refs.alert.show(nextProps.error.message);
			return;
		}
		// login success
		if(nextProps.response && nextProps.response !== this.props.response) {
			// setup app
			setupApp(nextProps.response.data);
			// dashboard home page
			browserHistory.push('/');
		}
	}

	render() {
		const { isLoading } = this.props;
		return (
			<div className="login">
				<div className="login-screen middle-box text-center loginscreen">
					<div className="login-icon">
						<img src={ logoImage } alt="Welcome"/>
						<h4><small>Login</small></h4>
					</div>
					<div className="login-form animated fadeInDown">
						<div className="control-group">
							<input type="text" ref="username" className="login-field" placeholder="Username" defaultValue="admin"/>
						</div>
						<div className="control-group">
							<input type="password" ref="passwd" className="login-field" placeholder="Password" defaultValue="111111" onKeyPress={ this.onKeyPress.bind(this) }/>
						</div>
						<div className="btn btn-success" style={ { width: '100%' } } disabled={isLoading} onClick={ this.onSubmit.bind(this) }>
						{ isLoading? <i className="fa fa-circle-o-notch fa-spin"/> : <i className="fa fa-paper-plane"/> }
						&nbsp;&nbsp;登录
						</div>
					</div>
				</div>
				<Alert ref="alert"/>
			</div>
		);
	}

	onKeyPress(e) {
		if (e.key === 'Enter') {
			this.onSubmit();
		}
	}

	onSubmit() {
		const username = this.refs.username.value;
		const passwd = this.refs.passwd.value;
		if(username.trim() === '') {
			this.refs.alert.show('Please input username');
			return;
		}
		if(passwd.trim() === '') {
			this.refs.alert.show('Please input password');
			return;
		}
		// submit
		this.props.dispatch(action.login(username, passwd));
	}
}

function mapStateToProps(state) {
	return state.login || {};
}

export default connect(mapStateToProps)(Login);