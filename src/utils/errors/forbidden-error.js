const StatusCodes = require('../status-codes');
const CustomError = require('./custom-error');

module.exports = class ForbiddenError extends CustomError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.FORBIDDEN;
	}
};
