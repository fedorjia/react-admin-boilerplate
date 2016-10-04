import http from '../utils/http';
import { form } from '../commons/action-types';

export default {
	/***
	 *  submit
	 */
	submit(data) {
		return {
			actionType: form.SUBMIT,
			callAPI: () => http.get('/static/assets/form.json', data)
		};
	}
};