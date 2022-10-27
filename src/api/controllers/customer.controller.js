const { CustomerService } = require('../../services');
const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');

module.exports = function CustomerController() {
	this.customerService = new CustomerService();
	// [POST] /customers
	const registerCustomer = async (req, res, next) => {
		try {
			const result = await this.customerService.registerCustomer(req.body);
			res
				.status(StatusCodes.CREATED)
				.json(new Response({ status: true, content: result }));
		} catch (err) {
			next(err);
		}
	};

	return {
		registerCustomer
	};
};
