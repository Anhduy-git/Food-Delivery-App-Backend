const {
	OrderRepository,
	DeliveryRepository,
	ChefRepository,
	CustomerRepository
} = require('../database/mongo/repositories');
const { BadRequestError } = require('../utils/errors');

module.exports = function OrderService() {
	this.orderRepository = new OrderRepository();
	this.deliveryRepository = new DeliveryRepository();
	this.chefRepository = new ChefRepository();
	this.customerRepository = new CustomerRepository();

	const createOrder = async ({ chef, customer, dishes }) => {
		// calculate total price
		let totalPrice = 0;
		dishes.forEach((item) => {
			totalPrice += item.price * item.quantity;
		});
		const orderData = {
			chef,
			customer,
			dishes,
			totalPrice
		};
		const createdOrder = await this.orderRepository.createOrder(orderData);

		// create new delivery
		const commissionCharge = 0.1;
		const deliveryData = {
			order: {
				id: createdOrder._id,
				customer: createdOrder.customer,
				chef: createdOrder.chef,
				totalPrice: createdOrder.totalPrice
			},
			fee: createdOrder.totalPrice * commissionCharge
		};
		await this.deliveryRepository.createDelivery(deliveryData);

		return createdOrder;
	};

	const getOrdersOfChef = async (chefID, pagination) => {
		// check if freelance cook exists
		const chef = await this.chefRepository.getChefByID(chefID);
		if (!chef) {
			throw new BadRequestError(`Chef ${chefID} does not exist`);
		}
		const orders = await this.orderRepository.getOrdersByChefID(
			chefID,
			pagination
		);
		return orders;
	};

	const getOrdersOfCustomer = async (customerID, pagination) => {
		// check if customer exists
		const customer = await this.customerRepository.getCustomerByID(customerID);
		if (!customer) {
			throw new BadRequestError(`Customer ${customerID} does not exist`);
		}
		const orders = await this.orderRepository.getOrdersByCustomerID(
			customerID,
			pagination
		);
		return orders;
	};

	return {
		createOrder,
		getOrdersOfCustomer,
		getOrdersOfChef
	};
};
