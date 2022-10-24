const express = require('express');
const { DeliveryController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

module.exports = function deliveryRouter() {
	const router = new express.Router();
	const deliveryController = new DeliveryController();

	router.route('/').get(authMiddleware, deliveryController.getDeliveries);
	router.route('/:id').patch(authMiddleware, deliveryController.updateDelivery);

	return router;
};
