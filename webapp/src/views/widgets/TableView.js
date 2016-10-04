import { Component, PropTypes } from 'react';
import Griddle from 'griddle-react';
import { connect } from 'react-redux';

import Spinner from './Spinner';
import Notifier from './Notifier';
import { load } from '../../actions/tableview';
import common from '../../commons/common';

class TableView extends Component {

	static propTypes = {
		id: PropTypes.string,
		dispatch: PropTypes.func.isRequired,
		columns: PropTypes.array.isRequired,
		items: PropTypes.array.isRequired,
		url: PropTypes.string.isRequired,
		isLoading: PropTypes.bool,
		isAutoLoad: PropTypes.bool,
		pageSize: PropTypes.number,
		currentPage: PropTypes.number,
		maxPage: PropTypes.number,
		queryParams: PropTypes.object
	};

	static defaultProps = {
		isAutoLoad: true,
		currentPage: 1
	};

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			// handler error
			this.refs.notifier.warning(nextProps.error.message);
		}
	}

	componentDidMount() {
		if (this.props.isAutoLoad === true) {
			this.loadData(this.props.currentPage, this.props.pageSize);
		}
	}

	render() {
		const {
				items, maxPage, pageSize,
				currentPage, isLoading, columns,
				isMultipleSelection=false
		} = this.props;

		let mColumns = [];
		columns.forEach((column) => {
			mColumns.push(column.columnName);
		});

		return (
				<div>
					<Griddle
							ref="griddle"
							gridClassName="box-body table-responsive no-padding"
							tableClassName="table table-hover"
							useExternal={ true }
							showSettings={ false }
							enableSort={ false }
							showPager={ !isLoading }
							externalChangeSort={ {} }
							externalSetFilter={ {} }
							columns={ mColumns }
							columnMetadata={ columns }
							results={ items }
							externalSetPage={ this.onSetPage.bind(this) }
							externalSetPageSize={ this.onSetPageSize.bind(this) }
							externalCurrentPage={ currentPage-1 }
							externalMaxPage={ maxPage }
							resultsPerPage={ pageSize }
							noDataMessage={ "No Data" }
							nextText={ "Next" }
							previousText={ "Prev" }
							externalIsLoading={ isLoading }
							externalLoadingComponent={ Spinner }
							isMultipleSelection={ isMultipleSelection }
					/>
					<Notifier ref="notifier"/>
				</div>
		);
	}

	reloadData() {
		this.loadData(1, this.props.pageSize);
	}

	loadData(pageIndex, pageSize) {
		this.props.dispatch(load(__id(this.props), this.props.url, this.props.queryParams || {}, pageIndex, pageSize));
	}

	onSetPage(index) {
		this.loadData(index+1, this.props.pageSize);
	}

	onSetPageSize(pageSize) {
		this.loadData(1, pageSize);
	}

	refresh() {
		this.loadData(this.props.currentPage, this.props.pageSize);
	}

	getSelectedRowIds() {
		return this.refs.griddle.getSelectedRowIds();
	}

	getSelections() {
		const items = this.props.items;
		const rowIds = this.getSelectedRowIds();
		const selections = [];
		for (let i = 0; i < items.length; i++) {
			for (let j = 0; j < rowIds.length; j++) {
				if (items[i].id === rowIds[j]) {
					selections.push(items[i]);
					break;
				}
			}
		}
		return selections;
	}
}

function __id(props) {
	let id = props.id;
	if (!id) {
		id = props.url;
	}
	return id;
}

function mapStateToProps(state, ownProps) {
	let stat = this ? state.tableview[__id(this.props)] : {};
	stat = stat || {};

	const {
			result,
			error,
			currentPage=1,
			isLoading=false,
			queryParams=common.getFilterState(location.pathname)
	} = stat;

	const pageSize = ownProps.pageSize;

	let maxPage = 0;
	let items = [];
	if (result) {
		maxPage = Math.ceil(result.data.count / pageSize);
		items = result.data.items;
	}

	return {
		error: error,
		items: items,
		maxPage: maxPage,
		currentPage: currentPage,
		isLoading: isLoading,
		queryParams: queryParams
	};
}

export default connect(
	mapStateToProps, null, null, { withRef: true }
)(TableView);