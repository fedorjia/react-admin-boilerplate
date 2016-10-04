export default {

	/***
	 * setup app
	 */
	setupApp(data) {
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
	},
	
	
	/**存储每次查询后的条件*/
	setFilterState(name, value) {
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
	},

	/**获取每次查询后的条件*/
	getFilterState(name) {
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
	},

	/**
	 * 清空查询条件
	 */
	clearFilterState() {
		APP.filterStates = [];
	},

	/***
	 * 将空值转空字符串
	 */
	emptyUndefinedValues(data) {
		for (const prop in data) {
			if (data.hasOwnProperty(prop)) {
				if (data[prop] === undefined) {
					data[prop] = '';
				}
			}
		}
		return data;
	}

};
