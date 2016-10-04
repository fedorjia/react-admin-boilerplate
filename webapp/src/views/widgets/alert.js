import { Component } from 'react';
class Alert extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const msg = this.state.msg;
		return (
			<div className="modal fade alert-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
				<div className="modal-dialog modal-sm">
					<div className="modal-content">
						<div className="modal-body">
							<div className="message">{ msg }</div>
							<div className="btn" onClick={ this.onClick.bind(this) }>确定</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	show(msg) {
		this.setState({ msg: msg });
		$('.alert-modal').modal({
			backdrop: 'static',
			keyboard: false
		});
	}

	hide() {
		$('.alert-modal').modal('hide');
	}

	onClick() {
		this.hide();
	}
}

export default Alert;
