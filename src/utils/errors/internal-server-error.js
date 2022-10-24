const StatusCodes = require('../status-codes');
const CustomError = require('./custom-error');

module.exports = class InternalServerError extends CustomError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
	}
};
