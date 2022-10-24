const { ShipperService } = require('../../services');
const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');

module.exports = function ShipperController() {
	this.shipperService = new ShipperService();
	// [POST] /shippers
	const registerShipper = async (req, res, next) => {
		try {
			const result = await this.shipperService.registerShipper(req.body);
			res
				.status(StatusCodes.OK)
				.json(new Response({ status: true, content: result }));
		} catch (err) {
			next(err);
		}
	};

	return {
		registerShipper
	};
};
