import { Component, PropTypes } from 'react';
/* spinner animation component */
class Spinner extends Component {
	render() {
		const cls = this.props.cls ? this.props.cls : '';
		return (
				<div>
					<div className={`spinner-container ${ cls }`}>
						<div className="spinner">
							<div className="rect1"></div>
							<div className="rect2"></div>
							<div className="rect3"></div>
							<div className="rect4"></div>
							<div className="rect5"></div>
						</div>
					</div>
					<div className="load-mask"></div>
				</div>
		);
	}
}

Spinner.propTypes = {
	cls: PropTypes.string
};

export default Spinner;
