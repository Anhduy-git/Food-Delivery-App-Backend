const { OrderService } = require('../../services');
const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');
const { BadRequestError } = require('../../utils/errors');

module.exports = function OrderController() {
	this.orderService = new OrderService();
	// [POST] /orders
	const createOrder = async (req, res, next) => {
		try {
			const createdOrder = await this.orderService.createOrder(req.body);
			// Emit event
			const eventEmitter = req.app.get('eventEmitter');
			eventEmitter.emit('orderCreated', createdOrder);
			eventEmitter.emit('deliveryCreated');

			res.status(StatusCodes.OK).json(new Response({ status: true }));
		} catch (err) {
			next(err);
		}
	};

	// [GET] /orders/?chefID=123&page=1&limit=5
	const getOrders = async (req, res, next) => {
		try {
			const limit = parseInt(req.query.limit, 10);
			const page = parseInt(req.query.page, 10);
			const pagination = { limit, page };

			const { chefID } = req.query;
			const { customerID } = req.query;

			let orders;
			if (chefID) {
				orders = await this.orderService.getOrdersOfChef(chefID, pagination);
			} else if (customerID) {
				orders = await this.orderService.getOrdersOfCustomer(
					customerID,
					pagination
				);
			} else {
				throw new BadRequestError('Invalid arguments');
			}
			res
				.status(StatusCodes.OK)
				.json(new Response({ status: true, content: orders }));
		} catch (err) {
			next(err);
		}
	};

	return {
		createOrder,
		getOrders
	};
};
