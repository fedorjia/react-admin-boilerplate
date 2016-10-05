import { Component } from 'react';
import { is } from '../../utils/index';

const initialState = {
	message: '',
	buttonText: 'Done',
	callback: undefined
};
const _state = Object.assign({}, initialState);

class Alert extends Component {
	constructor(props) {
		super(props);
		this.state = _state;
	}

	render() {
		const { message, buttonText } = this.state;
		return (
		<div className="modal fade alert-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
			<div className="modal-dialog modal-sm">
				<div className="modal-content">
					<div className="modal-body">
						<div className="message">{ message }</div>
						<div className="btn" onClick={ this.onClick.bind(this) }>{ buttonText }</div>
					</div>
				</div>
			</div>
		</div>
		);
	}

	show(options) {
		if(is.string(options)) {
			this.setState({ message: options });
		} else if(is.object(options)) {
			this.setState(Object.assign(this.state, options));
		} else {
			throw new Error('not support alert type');
		}
		
		$('.alert-modal').modal({
			backdrop: 'static',
			keyboard: false
		});
	}

	hide() {
		$('.alert-modal').modal('hide');
		// restore state
		this.setState(initialState);
	}

	onClick() {
		this.hide();
		if(this.state.callback) {
			this.state.callback();
		}
	}
}

export default Alert;
