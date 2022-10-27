require('dotenv').config();
const productionConfigs = require('./prod');
const developmentConfigs = require('./dev');
const testConfigs = require('./testing');

if (process.env.NODE_ENV === 'production') {
	console.log('prod');
	module.exports = productionConfigs;
} else if (process.env.NODE_ENV === 'development') {
	console.log('dev');
	module.exports = developmentConfigs;
} else if (process.env.NODE_ENV === 'test') {
	console.log('test');
	module.exports = testConfigs;
}
