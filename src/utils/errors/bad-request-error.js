const StatusCodes = require('../status-codes');
const CustomError = require('./custom-error');

module.exports = class BadRequestError extends CustomError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
};
