const { Order } = require('../models');

module.exports = function OrderRepository() {
	const createOrder = async (data) => {
		const order = await Order.create(data);
		return order;
	};

	const getOrdersByChefID = async (chefID, pagination) => {
		const { limit } = pagination;
		const { page } = pagination;
		const orders = await Order.find({
			'chef.id': chefID
		})
			.limit(limit)
			.skip(limit * (page - 1));

		return orders;
	};

	const getOrdersByCustomerID = async (customerID, pagination) => {
		const { limit } = pagination;
		const { page } = pagination;
		const orders = await Order.find({
			'customer.id': customerID
		})
			.limit(limit)
			.skip(limit * (page - 1));

		return orders;
	};

	return {
		createOrder,
		getOrdersByChefID,
		getOrdersByCustomerID
	};
};
