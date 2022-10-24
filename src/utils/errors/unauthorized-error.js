const StatusCodes = require('../status-codes');
const CustomError = require('./custom-error');

module.exports = class UnauthorizedError extends CustomError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
};
