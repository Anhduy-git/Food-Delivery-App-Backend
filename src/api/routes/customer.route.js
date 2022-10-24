const express = require('express');
const { CustomerController } = require('../controllers');

module.exports = function customerRouter() {
	const router = new express.Router();
	const customerController = new CustomerController();

	router.route('/').post(customerController.registerCustomer);

	return router;
};
