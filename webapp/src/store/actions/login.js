import { login } from '../action-types';
import http  from '../../utils/http';

export default {
	/***
	 *  login
	 */
	login(username, passwd) {
		return {
			actionType: login.LOGIN,
			callAPI: () => http.get('/static/assets/login.json', {
				username,
				passwd
			})
		};
	}
};