const AuthController = require('./authentication.controller');
const CustomerController = require('./customer.controller');
const ChefController = require('./chef.controller');
const ShipperController = require('./shipper.controller');
const DishController = require('./dish.controller');
const OrderController = require('./order.controller');
const DeliveryController = require('./delivery.controller');

module.exports = {
	AuthController,
	CustomerController,
	ChefController,
	ShipperController,
	DishController,
	OrderController,
	DeliveryController
};
