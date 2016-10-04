import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Notifier from './widgets/Notifier';
import Spinner from './widgets/Spinner';
import { browserHistory } from 'react-router';
import action from '../actions/mform';

class MForm extends Component {

	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		dispatch: PropTypes.func.isRequired,
		error: PropTypes.object,
		response: PropTypes.object
	};

	/****************************** Lifecycle ***************************************/

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.error && nextProps.error !== this.props.error) {
			this.refs.notifier.warning(nextProps.error.message);
			return;
		}

		if(nextProps.response && nextProps.response !== this.props.response) {
			browserHistory.push('/list');
		}
	}

	render() {
		let {
			handleSubmit,
			isLoading,
		} = this.props;

		return (
			<div className="form-view">
				<section className="content-header">
					Form
				</section>
				<section className="content">
					<form className="box box-default box-form-split" onSubmit={ handleSubmit(this.onSubmitForm.bind(this)) }>
						<div className="box-body">
							<div className="row">
								<div className="col-md-12">
									<Field name="name" type="text" component={renderField} label="name"/>
									<Field name="purchasingPrice" type="number" component={renderField} label="purchasingPrice"/>
									<Field name="sellingPrice" type="number" component={renderField} label="sellingPrice"/>
									<Field name="note" type="textarea" component={renderTextarea} label="note"/>
								</div>
							</div>
						</div>

						<div className="box-footer">
							<button type="submit" className="btn btn-primary longer" disabled={isLoading}>
								{ isLoading? <i className="fa fa-circle-o-notch fa-spin"/> : <i className="fa fa-paper-plane"/> } &nbsp;&nbsp;Submit
							</button>
						</div>
					</form>
				</section>

				<Notifier ref="notifier"/>
				{ isLoading ? <Spinner cls="ccenter"/> : '' }
			</div>
		);
	}

	/****************************** Events ***************************************/

	onSubmitForm(data) {
		this.props.dispatch(action.submit(data));
	}
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
	<div className="form-group">
			<label>{ label }</label>
			<input className="form-control" {...input} placeholder={label} type={type}/>
			{touched && error && <span className="error-msg">{error}</span>}
	</div>
);

const renderTextarea = ({ input, label, type, meta: { touched, error } }) => (
	<div className="form-group">
		<label>{ label }</label>
		<textarea className="form-control" {...input} placeholder={label} type={type}/>
		{touched && error && <span className="error-msg">{error}</span>}
	</div>
);

const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = 'name could not be empty';
	}
    if (!values.purchasingPrice) {
        errors.purchasingPrice = 'purchase price could not be empty';
    }
    if (!values.sellingPrice) {
        errors.sellingPrice = 'saling price could not be empty';
    }
	return errors;
};

function mapStateToProps(state) {
	const mform = state.mform || {};
//	const { formData={} } = mform;
	return {
		initialValues : { name: 'fedor' },
		...mform
	};
}

MForm = reduxForm({
	form: 'MForm',
	validate
})(MForm);

MForm = connect(
	mapStateToProps
)(MForm);

export default MForm;