/* global process */
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./R1oot.prod.js');
} else {
	module.exports = require('./R1oot.dev.js');
}