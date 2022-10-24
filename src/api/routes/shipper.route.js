const express = require('express');
const { ShipperController } = require('../controllers');

module.exports = function shipperRouter() {
	const router = new express.Router();
	const shipperController = new ShipperController();

	router.route('/').post(shipperController.registerShipper);

	return router;
};
