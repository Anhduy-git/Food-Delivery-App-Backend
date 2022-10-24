const express = require('express');
const { ChefController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

module.exports = function dishRouter() {
	const router = new express.Router();
	const chefController = new ChefController();

	router
		.route('/')
		.get(authMiddleware, chefController.getChefs)
		.post(chefController.registerChef);

	return router;
};
