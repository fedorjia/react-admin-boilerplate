import { Component } from 'react';
import { Link } from 'react-router';
import { clearSearchCondition } from '../../commons/index';

class AppSidebar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<aside className="main-sidebar">
			<section className="sidebar">
				<ul className="sidebar-menu">
					{/* <li className="header">Navigation</li>
					 { this.renderTreeNode(this.props.publics) } */}
					<li className="header">System</li>
					{ this.renderTreeNode(this.props.privates) }
				</ul>
			</section>
		</aside>
		);
	}

	renderTreeNode(menus) {
		if(!menus) {
			return;
		}

		const loop = (menus) => {
			return menus.map((node) => {
                if (node.children.length > 0) {
                    return (
                        <li className="treeview" key={ node.id }>
                            <a href="#">
                                <i className={ `fa ${node.icon}` }/>
                                <span>{ node.name }</span>
                                <i className="fa pull-right fa-angle-right"/>
                            </a>
                            <ul className="treeview-menu">
                                {loop(node.children)}
                            </ul>
                        </li>
                    );
                } else {
                    if(node.parentId) {
                        return (
                            <li key={ node.id }>
                                <Link to={ node.url } onClick={ this.onClick.bind(this) }><i/> { node.name }</Link>
                            </li>
                        );
                    } else {
                        return (
                            <li key={ node.id } className="treeview">
                                <Link to={ node.url } onClick={ this.onClick.bind(this) }>
                                    <i className={ `fa ${node.icon}` }/>
                                    <span>{ node.name }</span>
                                </Link>
                            </li>
                        );
                    }
                }
			});
		};
		return loop(menus);
	}

	onClick() {
		// clear search condiction when change sidebar menu
		clearSearchCondition(location.pathname, null);
		// scroll top when change menu
		$('body').scrollTop(0);
	}
}

export default AppSidebar;