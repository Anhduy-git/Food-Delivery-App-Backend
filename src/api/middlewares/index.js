const authMiddleware = require('./authentication');
const errorHandlerMiddleware = require('./error-handler');

module.exports = {
	authMiddleware,
	errorHandlerMiddleware
};
