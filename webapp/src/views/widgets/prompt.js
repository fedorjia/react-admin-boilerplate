import {Component} from 'react';
class Prompt extends Component {

	constructor(props) {
		super(props);
		this.state = {
			options: {
				yesText: '是',
				noText: '否'
			}
		};
	}

	render() {
		const { yesText, noText, msg, placeholder } = this.state.options;

		return (
				<div className="modal fade prompt-modal" tabIndex="-1" role="dialog"
					aria-labelledby="mySmallModalLabel">
					<div className="modal-dialog modal-sm">
						<div className="modal-content">
							<div className="modal-body">
								<div className="message">{ msg }</div>
								<div className="form-group">
									<input type="text" ref="content" className="form-control" placeholder={ placeholder }/>
								</div>
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
		this.setState({
			options: Object.assign(this.state.options, options || {})
		});

		const t = $('.modal-backdrop').length === 0 ? 0 : 480;
		setTimeout(() => {
			$('.prompt-modal').modal({
				backdrop: 'static',
				keyboard: false
			});
		}, t);
	}

	hide() {
		$('.prompt-modal').modal('hide');
	}

	onClickYes() {
		const value = $(this.refs.content).val();
		if(!value) {
			return;
		}
		this.state.options.callback(0, value);
		this.hide();
	}

	onClickNo() {
		this.state.options.callback(1);
		this.hide();
	}
}

export default Prompt;
