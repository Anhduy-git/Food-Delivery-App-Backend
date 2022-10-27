const { ChefService, LoggingService } = require('../../services');
const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');
const { BadRequestError } = require('../../utils/errors');

module.exports = function ChefController() {
	this.chefService = new ChefService();
	this.loggingService = new LoggingService();
	// [POST] /chefs
	const registerChef = async (req, res, next) => {
		try {
			const result = await this.chefService.registerChef(req.body);
			// call logging service
			this.loggingService.registerLoggingProducer(result.chef.phoneNumber);
			res
				.status(StatusCodes.CREATED)
				.json(new Response({ status: true, content: result }));
		} catch (err) {
			next(err);
		}
	};

	// [GET] /chefs/?customerLocation=12.1324,122.412&page=1&limit=5
	const getChefs = async (req, res, next) => {
		try {
			const customerLocationStr = req.query.customerLocation;
			const limit = parseInt(req.query.limit, 10);
			const page = parseInt(req.query.page, 10);
			const pagination = { limit, page };

			let chefs;
			if (customerLocationStr) {
				// convert strng to array
				const customerLocationArray = customerLocationStr.split(',');
				const customerLocation = {
					lat: Number(customerLocationArray[0]),
					lng: Number(customerLocationArray[1])
				};
				chefs = await this.chefService.getChefs(customerLocation, pagination);
			} else {
				throw new BadRequestError('Missing parameters');
			}
			res
				.status(StatusCodes.OK)
				.json(new Response({ status: true, content: chefs }));
		} catch (err) {
			next(err);
		}
	};

	return {
		registerChef,
		getChefs
	};
};
