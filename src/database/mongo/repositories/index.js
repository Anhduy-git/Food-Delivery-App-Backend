const UserRepository = require('./user.repository');
const OTPRepository = require('./otp.repository');
const CustomerRepository = require('./customer.repository');
const ChefRepository = require('./chef.repository');
const ShipperRepository = require('./shipper.repository');
const DishRepository = require('./dish.repository');
const OrderRepository = require('./order.repository');
const DeliveryRepository = require('./delivery.repository');

module.exports = {
	UserRepository,
	OTPRepository,
	CustomerRepository,
	ChefRepository,
	ShipperRepository,
	DishRepository,
	OrderRepository,
	DeliveryRepository
};
