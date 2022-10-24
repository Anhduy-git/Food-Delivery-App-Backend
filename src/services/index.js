const AuthService = require('./authentication.service');
const CustomerService = require('./customer.service');
const ChefService = require('./chef.service');
const ShipperService = require('./shipper.service');
const DishService = require('./dish.service');
const OrderService = require('./order.service');
const DeliveryService = require('./delivery.service');

module.exports = {
	AuthService,
	CustomerService,
	ChefService,
	ShipperService,
	DishService,
	OrderService,
	DeliveryService
};
