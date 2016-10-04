import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
// notification 
class Notifier extends Component {

	constructor(props) {
		super(props);
		this.key = 0;
		this.defaultTimeout = 2800;
		this.displayName = 'Notifier';
		this.state = {};
	}

	render() {
		const animDuration = 400;
		const keys  = Object.keys(this.state);
		const state = this.state;
		const hide  = this.hide.bind(this);

		const itemComponent = keys.map(function(key) {
			return React.createElement(NotifierItem, {
				id: key,
				key: key,
				theme: state[key].theme,
				msg: state[key].msg,
				duration: state[key].time,
				hide: hide
			});
		});

		return (
			<div className="notification-container">
				<ReactCSSTransitionGroup transitionName="notification" 
					transitionEnterTimeout={ animDuration } 
					transitionLeaveTimeout={ animDuration }>

					{ itemComponent }
				</ReactCSSTransitionGroup>
			</div>
		);
	}

	info(msg, time) {
		this.show(msg, !time ? this.defaultTimeout : time, 'info');
	}

	success(msg, time) {
		this.show(msg, !time ? this.defaultTimeout : time, 'success');
	}

	warning(msg, time) {
		this.show(msg, !time ? this.defaultTimeout : time, 'warning');
	}

	error(msg, time) {
		this.show(msg, !time ? this.defaultTimeout : time, 'error');
	}

	show(msg, time, theme) {
		let key = this.key++;
		let state = this.state;
		state[key] = { msg: msg, time: time, theme: theme };

		this.setState(state);
	}

	hide(key) {
		delete this.state[key];
		this.setState(this.state);
	}
}

class NotifierItem extends Component {

	constructor(props) {
		super(props);
		this.displayName = 'NotifierItem';
	}

	componentDidMount() {
		const that = this;
		const { duration } = this.props;
		this.timer = setTimeout(() => { that.hide(); }, duration);
	}

	componentWillUnmount() {
		if (this.timer) {
			clearTimeout(this.timer);
		}
	}

	hide() {
		this.props.hide(this.props.id);
	}

	render() {
		const { theme, msg } = this.props;
		return (
			<div className={ `notification notification-${theme}` } onClick={ this.hide.bind(this) }>
				<div className="notification-message">
					<div className="message">{ msg }</div>
				</div>
			</div>
		);
	}
}

NotifierItem.propTypes = {
	id: PropTypes.string.isRequired,
	theme: PropTypes.string.isRequired,
	msg: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	hide: PropTypes.func.isRequired
};

export default Notifier;