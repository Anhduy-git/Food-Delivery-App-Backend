const express = require('express');
const { OrderController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

module.exports = function orderRouter() {
	const router = new express.Router();
	const orderController = new OrderController();

	router
		.route('/')
		.get(authMiddleware, orderController.getOrders)
		.post(authMiddleware, orderController.createOrder);

	return router;
};
