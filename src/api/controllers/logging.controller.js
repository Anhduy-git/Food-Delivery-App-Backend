const { LoggingService } = require('../../services');
const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');

module.exports = function LoggingController() {
	this.loggingService = new LoggingService();
	// [GET] /logs/registration
	const getRegistrationLogs = async (req, res, next) => {
		try {
			const logs = await this.loggingService.getRegistrationLogs();
			res
				.status(StatusCodes.OK)
				.json(new Response({ status: true, content: { logs } }));
		} catch (err) {
			next(err);
		}
	};
	return {
		getRegistrationLogs
	};
};
