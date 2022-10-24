const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');

module.exports = (err, req, res, next) => {
	const customError = {
		// set default error
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		message: err.message || 'Internal Server Error!'
	};

	res
		.status(customError.statusCode)
		.json(new Response({ status: false, error: customError }));
};
