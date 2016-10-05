import {Component} from 'react';
import { is } from '../../utils/index';

const initialState = {
	message: '',
	yesText: 'YES',
	noText: 'NO',
	yesClass: 'btn-link',
	noClass: '',
	placeholder: '',
	callback: undefined
};
const _state = Object.assign({}, initialState);

class Prompt extends Component {
	constructor(props) {
		super(props);
		this.state = _state;
	}

	render() {
		const { yesText, noText, yesClass, noClass, message, placeholder } = this.state;
		return (
		<div className="modal fade prompt-modal" tabIndex="-1" role="dialog"
			aria-labelledby="mySmallModalLabel">
			<div className="modal-dialog modal-sm">
				<div className="modal-content">
					<div className="modal-body">
						<div className="message">{ message }</div>
						<div className="form-group">
							<input type="text" ref="content" className="form-control" placeholder={ placeholder }/>
						</div>
						<div className="footer">
							<div className={`btn btn-confirm ${yesClass}` } onClick={ this.onClickYes.bind(this) }>
								{ yesText }
							</div>
							<div className={`btn btn-cancel ${noClass}` } onClick={ this.onClickNo.bind(this) }>
								{ noText }
							</div>
						</div>
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

		const t = $('.modal-backdrop').length === 0 ? 0 : 480;
		setTimeout(() => {
			$('.prompt-modal').modal({
				backdrop: 'static',
				keyboard: false
			});
		}, t);
	}

	hide() {
		$(this.refs.content).val('');
		$('.prompt-modal').modal('hide');
		// restore state
		this.setState(initialState);
	}

	onClickYes() {
		const value = $(this.refs.content).val();
		if(!value) {
			return;
		}
		this.hide();
		if(this.state.callback) {
			this.state.callback(1, value);
		}
	}

	onClickNo() {
		this.hide();
		if(this.state.callback) {
			this.state.callback(0);
		}
	}
}

export default Prompt;
