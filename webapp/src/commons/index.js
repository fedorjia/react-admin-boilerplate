/***
 * setup app
 */
export const setupApp = (data) => {
	// setup app
	const menus = data.menus;
	const user = data.user;
	const publicMenus = [];
	const privateMenus = [];
	for(const menu of menus) {
		if(menu.isPrivate) {
			privateMenus.push(menu);
		} else {
			publicMenus.push(menu);
		}
	}

	APP.user = user;
	APP.menus = {
		publics: publicMenus,
		privates: privateMenus
	};
	sessionStorage.setItem('local-user', JSON.stringify(APP.user));
};


/***
 * save search condictoin
 */
export const saveSearchCondition = (name, value) => {
	if (!name) {
		return;
	}
	value = value || {};
	let store = null;
	for (let i = 0; i < APP.filterStates.length; i++) {
		const filter = APP.filterStates[i];
		for (let pro in filter) {
			if (pro === name) {
				store = filter;
			}
		}
	}
	if (store) {
		store[name] = value;
	} else {
		const tmp = {};
		tmp[name] = value;
		APP.filterStates.push(tmp);
	}
};


/***
 * get saved condition
 */
export const getSearchCondition = (name) => {
	let value;
	for (let i = 0; i < APP.filterStates.length; i++) {
		const filter = APP.filterStates[i];
		for (let pro in filter) {
			if (pro === name) {
				if (filter.hasOwnProperty(pro)) {
					value = filter[pro];
					break;
				}
			}
		}
	}
	return value || {};
};


/***
 * clear search condiction
 */
export const clearSearchCondition = () => {
	APP.filterStates = [];
};