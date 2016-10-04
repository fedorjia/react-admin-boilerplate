import React, {Component} from 'react';
import BaseModal from '../generic/BaseModal';

class CampaignAcceptModal extends Component {
	constructor(props) {
		super(props);
		this.state = {hasShown: false};
	}

	componentDidMount() {

	}

	render() {
		const modalProps = this.makeProps();
		return (
				<BaseModal ref="modal" { ...modalProps } scale="modal-sm"/>
		);
	}

	show() {
		this.setState({hasShown: true});
		this.refs.modal.show();
	}

	hide() {
		this.setState({hasShown: false});
		this.refs.modal.hide();
	}

	makeProps() {
		const title = '填写信息';
		const buttons = [{
			style: 'primary',
			label: '确定',
			onClick: this.onClick.bind(this)
		}];
		const body = this.makeBody();

		return {
			title: title,
			buttons: buttons,
			body: body
		};
	}

	makeBody() {
		return (
				<form>
					<div className="form-group">
						<label>价格</label>
						<input type="number" ref="price" className="form-control" min="0" step="any"/>
					</div>
					<div className="form-group">
						<label>小时</label>
						<input type="number" ref="intervals" className="form-control" min="1" step="1"/>
					</div>
				</form>
		);
	}

	onClick() {
		const price = $(this.refs.price).val();
		const intervals = $(this.refs.intervals).val();
		if(price && intervals) {
			this.props.doAccept({
				price,
				intervals
			});
			this.hide();
		}
	}
}

export default CampaignAcceptModal;