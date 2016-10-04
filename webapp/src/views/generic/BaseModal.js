import React, { Component, PropTypes } from 'react';

class BaseModal extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { title, body, buttons } = this.props;

		let scale = this.props.scale || '';
		return (
			<div ref="modal" className="modal fade app-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
				<div className={ `modal-dialog ${scale}` } role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title">{ title }</h4>
						</div>

						<div className="modal-body">
							{ body }
						</div>

						<div className="modal-footer">
							{
								buttons.map((button, index) => 
									<button type="button" key={ index } className={ `btn btn-${button.style}` } onClick={ button.onClick }>{ button.label }</button>)
							}
						</div>
					</div>
				</div>
			</div>
		);
	}

	show() {
		$(this.refs.modal).modal({
			backdrop: 'static',
			keyboard: false
		});
		// $('.app-modal').modal({
		// 	backdrop: 'static',
		// 	keyboard: false
		// });
	}

	hide() {
		$(this.refs.modal).modal('hide');
		// $('.app-modal').modal('hide');
	}
}

BaseModal.propTypes = {
	title: PropTypes.string.isRequired,
	body: PropTypes.object.isRequired,
	buttons: PropTypes.array.isRequired
};

export default BaseModal;
