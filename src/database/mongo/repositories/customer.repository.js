const { Customer } = require('../models');

module.exports = function CustomerRepository() {
	const createCustomer = async (data) => {
		const customer = await Customer.create(data);
		return customer;
	};
	const getCustomerByID = async (id) => {
		const customer = await Customer.findById(id);
		return customer;
	};
	const getCustomerByUserID = async (userID) => {
		const customer = await Customer.findOne({ userID });
		return customer;
	};

	return {
		createCustomer,
		getCustomerByID,
		getCustomerByUserID
	};
};
