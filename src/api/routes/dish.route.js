const express = require('express');
const { DishController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

module.exports = function dishRouter() {
	const router = new express.Router();
	const dishController = new DishController();

	router
		.route('/')
		.get(authMiddleware, dishController.getDishes)
		.post(authMiddleware, dishController.createDish);

	return router;
};
