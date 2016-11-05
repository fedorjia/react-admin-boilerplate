import http from '../utils/http';
import { tableview } from '../commons/action-types';

export function load(id, url, params = {}, pageIndex, pageSize) {
	if(typeof(pageIndex) !== 'undefined') {
		params['pageIndex'] = pageIndex;
	}
	if(pageSize) {
		params['pageSize'] = pageSize;
	}
	return {
		actionType: tableview.DATA,
		callAPI: () => http.get(url, params),
		payload: { id: id, currentPage: pageIndex, pageSize: pageSize, queryParams: params}
	};
}