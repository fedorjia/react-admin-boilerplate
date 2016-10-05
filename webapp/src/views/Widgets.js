import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Spinner from './widgets/Spinner';
import { clearViewState } from '../actions/state';
import { load } from '../actions/widgets';

class Widgets extends Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		isLoading: PropTypes.bool
	};

	constructor(props) {
		super(props);
	}

	componentWillUnmount() {
		this.props.dispatch(clearViewState(this.constructor.name));
	}

	render() {
		const { isLoading } = this.props;
		return (
		<div className="widgets-view">
			<section className="content-header">
				<h1>Widgets</h1>
			</section>
			<section className="content">
				<div className="btn btn-primary longer" onClick={this.onAlert.bind(this)}>Alert</div>
				<br/><br/>
				<div className="btn btn-primary longer" onClick={this.onConfirm.bind(this)}>Confirm</div>
				<br/><br/>
				<div className="btn btn-primary longer" onClick={this.onPrompt.bind(this)}>Prompt</div>
				<br/><br/>
				<div className="btn btn-primary longer" onClick={this.onSpinner.bind(this)}>Spinner</div>
				<br/><br/>
				<div className="btn btn-primary longer" onClick={this.onToast.bind(this)}>Toast</div>
			</section>

			{ isLoading ? <Spinner cls="ccenter"/> : '' }
		</div>
		);
	}

	onAlert() {
		APP.refs.alert.show('Alert');
	}
	
	onConfirm() {
		APP.refs.confirm.show({
			msg: 'Confirm',
			callback: (index) => {
			}
		});
	}
	
	onPrompt() {
		APP.refs.prompt.show({
			msg: 'Prompt',
			placeholder: 'placeholder',
			callback: (index) => {
			}
		});
	}
	
	onToast() {
		APP.refs.notifier.success('success');
		APP.refs.notifier.warning('warning');
		APP.refs.notifier.error('error');
	}

	onSpinner() {
		this.props.dispatch(load());
	}
}

function mapStateToProps(state) {
	return state.widgets || {};
}

export default connect(mapStateToProps)(Widgets);