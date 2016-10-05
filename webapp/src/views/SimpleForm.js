import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';

import Spinner from './widgets/Spinner';
import { clearViewState } from '../actions/state';
import action from '../actions/simple-form';

class SimpleForm extends Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		initialValues: PropTypes.object,
		error: PropTypes.object,
		response: PropTypes.object
	};

	/****************************** Lifecycle ***************************************/

	constructor(props) {
		super(props);
	}

	componentWillUnmount() {
		this.props.dispatch(clearViewState(this.constructor.name));
	}

	componentDidMount() {
		this.props.dispatch(action.load());
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.error && nextProps.error !== this.props.error) {
			APP.refs.notifier.warning(nextProps.error.message);
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
										<Field name="mobile" type="number" component={renderField} label="mobile"/>
										<Field name="age" type="number" component={renderField} label="age"/>
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
	if (!values.mobile) {
		errors.mobile = 'mobile could not be empty';
	}
	if (!values.age) {
		errors.age = 'age could not be empty';
	}
	return errors;
};

function mapStateToProps(state) {
	return state.simpleForm || {};
}

SimpleForm = reduxForm({
	form: 'SimpleForm',
	validate
})(SimpleForm);

SimpleForm = connect(
	mapStateToProps
)(SimpleForm);

export default SimpleForm;