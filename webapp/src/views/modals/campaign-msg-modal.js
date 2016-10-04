import { Component, PropTypes } from 'react';
import BaseModal from '../generic/BaseModal';

class CampaignMsgModal extends Component {
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
		const title = '消息';
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
						<textarea ref="content" className="form-control" placeholder="请输入内容" rows="4"></textarea>
					</div>
				</form>
		);
	}

	onClick() {
		const content = $(this.refs.content).val();
		if(content) {
			this.props.doPost(content);
			this.hide();
		}
	}
}

CampaignMsgModal.propTypes = {
	doPost: PropTypes.func.isRequired
};

export default CampaignMsgModal;