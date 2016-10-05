import { Component, PropTypes } from 'react';
import { clearViewState } from '../../actions/state';

class BaseComponent extends Component {

	constructor(props) {
		super(props);
	}

	componentWillUnmount() {
		this.props.dispatch(clearViewState(this.constructor.name));
	}
}

//BaseComponent.propTypes = {
//	dispatch: PropTypes.func.isRequired
//};

export default BaseComponent;
