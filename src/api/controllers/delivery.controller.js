const { DeliveryService } = require('../../services');
const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');

module.exports = function DeliveryController() {
	this.deliveryService = new DeliveryService();
	// [PATCH] /deliveries/:id
	const updateDelivery = async (req, res, next) => {
		try {
			await this.deliveryService.updateDelivery(req.params.id, req.body);
			res.status(StatusCodes.OK).json(new Response({ status: true }));
		} catch (err) {
			next(err);
		}
	};

	// [GET] /deliveries/?shipperLocation=123,456&page=1&limit=5
	const getDeliveries = async (req, res, next) => {
		try {
			const { shipperID } = req.query;
			const limit = parseInt(req.query.limit, 10);
			const page = parseInt(req.query.page, 10);
			const pagination = { limit, page };

			let deliveries;
			if (shipperID) {
				deliveries = await this.deliveryService.getDeliveriesOfShipper(
					shipperID,
					pagination
				);
			} else {
				deliveries = await this.deliveryService.getDeliveriesNotDelivered(
					pagination
				);
			}
			res
				.status(StatusCodes.OK)
				.json(new Response({ status: true, content: deliveries }));
		} catch (err) {
			next(err);
		}
	};

	return {
		getDeliveries,
		updateDelivery
	};
};
