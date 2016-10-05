import http from '../utils/http';
import { simpleForm } from '../commons/action-types';

export default {
	/***
	 *  submit
	 */
	submit(data) {
		return {
			actionType: simpleForm.SUBMIT,
			callAPI: () => http.get('/static/assets/form.json', data)
		};
	}
};