import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

	componentDidMount() {
		// fix
		$.AdminLTE.layout.fix();
		$.AdminLTE.layout.fixSidebar();
	}

	render() {
		return (
			<div className="home-view">
				<section className="content-header">
					<h1>react-spa-boilerplate</h1>
				</section>
				<section className="content">
					react single page web application boilerplate.
				</section>
			</div>
		);
	}
}

function mapStateToProps() {}

export default connect(mapStateToProps)(Home);