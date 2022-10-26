const express = require('express');
const { LoggingController } = require('../controllers');

module.exports = function orderRouter() {
	const router = new express.Router();
	const loggingController = new LoggingController();

	router.route('/registration').get(loggingController.getRegistrationLogs);

	return router;
};
