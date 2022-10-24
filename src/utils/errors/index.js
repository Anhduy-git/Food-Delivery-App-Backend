const UnauthorizedError = require('./unauthorized-error');
const NotFoundError = require('./not-found-error');
const BadRequestError = require('./bad-request-error');
const ForbiddenError = require('./forbidden-error');
const InternalServerError = require('./internal-server-error');

module.exports = {
	UnauthorizedError,
	NotFoundError,
	BadRequestError,
	ForbiddenError,
	InternalServerError
};
