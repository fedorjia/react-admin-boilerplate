import { Component, PropTypes } from 'react';
//import { clearState } from '../../actions/state';

class BaseComponent extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
//		APP.fixLayout();
	}

	componentWillUnmount() {
//		this.props.dispatch(clearState());
	}
}

BaseComponent.propTypes = {
	dispatch: PropTypes.func.isRequired
};

export default BaseComponent;
