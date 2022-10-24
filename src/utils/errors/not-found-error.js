const StatusCodes = require('../status-codes');
const CustomError = require('./custom-error');

module.exports = class NotFoundError extends CustomError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.NOT_FOUND;
	}
};
