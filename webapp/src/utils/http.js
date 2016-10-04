import 'whatwg-fetch';

function __createURL(url) {
	let hasQ = url.indexOf('?') !== -1;
	url += (hasQ ? '&' : '?') + '_auth=x';
	return url;
}

/**
 * fetch
 */
function __fetch(url, options) {
	return fetch(url, options)
			.then((response) => {
				return response.json();
			}).then((json) => {
				if(json.success) {
					return { data: json.result, __timestamp__: Date.now() };
				} else {
					return Promise.reject(new Error(json.result));
				}
			}).catch((ex) => {
				return Promise.reject({ message: ex.message, __timestamp__: Date.now() });
			});
}

/**
 * request
 */
function __request(method, url, params, files) {
	url = __createURL(url);
	if(method === 'GET' || method === 'DELETE') {
		for (const prop in params) {
			if (params.hasOwnProperty(prop)) {
				url += `&${prop}=${params[prop]}`;
			}
		}
		return __fetch(url, { method: method });
	} else {
		if(files && files.length > 0) {
			// form-data
			const formData = new FormData();
			for (let prop in params) {
				if (params.hasOwnProperty(prop)) {
					formData.append(prop, params[prop]);
				}
			}
			if(files) {
				for(const file of files) {
					formData.append(file.name, file.file);
				}
			}
			return __fetch(url, {
				method: method,
				body: formData
			});
		} else {
			// x-www-form-urlencoded
			const body = Object.keys(params).map((key) => {
				return key + '=' + encodeURIComponent(params[key]);
			}).join('&');

			return __fetch(url, {
				method: method,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: body
			});
		}
	}
}

/*********************************************
 * HTTP Client
 *********************************************/
export default {
	/**
	 * GET
	 */
	get(url, params = {}) {
		return __request('GET', url, params);
	},

	/**
	 * DELETE
	 */
	delete(url, params = {}) {
		return __request('DELETE', url, params);
	},

	/**
	 * POST
	 */
	post(url, params = {}) {
		return __request('POST', url, params);
	},

	/**
	 * upload
	 */
	upload(url, params = {}, files) {
		return __request('POST', url, params, files);
	},

	/**
	 * PUT
	 */
	put(url, params = {}, files) {
		return __request('PUT', url, params, files);
	}
};
