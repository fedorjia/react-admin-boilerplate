import {Component} from 'react';
class Confirm extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {yesText, noText, msg} = this.state;

		return (
				<div className="modal fade confirm-modal" tabIndex="-1" role="dialog"
				     aria-labelledby="mySmallModalLabel">
					<div className="modal-dialog modal-sm">
						<div className="modal-content">
							<div className="modal-body">
								<div className="message">{ msg }</div>
								<div className="footer">
									<div className="btn btn-confirm" onClick={ this.onClickYes.bind(this) }>
										{ yesText }
									</div>
									<div className="btn btn-cancel" onClick={ this.onClickNo.bind(this) }>
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
		if (!options.yesText) {
			options.yesText = '是';
		}
		if (!options.noText) {
			options.noText = '否';
		}
		this.setState(options);

		const t = $('.modal-backdrop').length === 0 ? 0 : 480;
		setTimeout(() => {
			$('.confirm-modal').modal({
				backdrop: 'static',
				keyboard: false
			});
		}, t);
	}

	hide() {
		$('.confirm-modal').modal('hide');
	}

	onClickYes() {
		this.state.callback(0);
		this.hide();
	}

	onClickNo() {
		this.state.callback(1);
		this.hide();
	}
}

export default Confirm;
