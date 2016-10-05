/**
 * mix some common methods
 */
export default function() {

	/***
	 * fake console method if in production mode
	 */
	if (process.env.NODE_ENV === 'production') {
		const console = {};
		console.log = () => {};
		console.warn = () => {};
		console.error = () => {};
		window.console = console;
	}

	/**
	 * serialize form
	 */
	$.fn.serializeObject = function () {
		const o = {};
		const a = this.serializeArray();
		$.each(a, function () {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};

	/**
	 * capitalize first letter
	 */
	String.prototype.capitalizeFirstLetter = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	/**
	 * lowercase first letter
	 */
	String.prototype.lowercaseFirstLetter = function() {
		return this.charAt(0).toLowerCase() + this.slice(1);
	};

	/**
	 * date format
	 *  usage: new Date().format('yyyy/MM/dd hh:mm:ss');
	 */
	Date.prototype.format = function(format) {
		var o = {
			'M+' : this.getMonth() + 1, // month
			'd+' : this.getDate(), // day
			'h+' : this.getHours(), // hour
			'm+' : this.getMinutes(), // minute
			's+' : this.getSeconds(), // second
			'q+' : Math.floor((this.getMonth() + 3) / 3), // quarter
			'S' : this.getMilliseconds() // millisecond
		};
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '')
				.substr(4 - RegExp.$1.length));
		}
		for (const k in o) {
			if (new RegExp('(' + k + ')').test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ('00' + o[k]).substr(('' + o[k]).length));
			}
		}
		return format;
	};
}
