const { BadRequestError } = require('../utils/errors');
const {
	UserRepository,
	CustomerRepository
} = require('../database/mongo/repositories');
const { ImageStorageClient } = require('../clients');
const { AuthHelper } = require('../helpers');
const { UserConstant } = require('../constants');
const config = require('../config');

module.exports = function CustomerService() {
	this.userRepository = new UserRepository();
	this.customerRepository = new CustomerRepository();
	this.authHelper = new AuthHelper();
	this.imageStorageClient = new ImageStorageClient();
	this.userConstant = new UserConstant();

	const registerCustomer = async ({
		phoneNumber,
		name,
		address,
		dob,
		avatar
	}) => {
		const user = await this.userRepository.getUserByPhoneNumber(phoneNumber);
		// check if user exist
		if (user) {
			throw new BadRequestError('Account already exists');
		}

		// upload & get image uploaded url
		const avatarPreset = 'order_app_customer_avatar';
		const avatarUploadedURL = await this.imageStorageClient.uploadImage(
			avatar,
			avatarPreset
		);
		// create new user & customer
		const userData = {
			phoneNumber,
			userType: this.userConstant.userType.CUSTOMER
		};

		const createdUser = await this.userRepository.createUser(userData);

		const customerData = {
			userID: createdUser._id,
			name,
			phoneNumber,
			dob,
			address,
			avatar: avatarUploadedURL
		};

		const createdCustomer = await this.customerRepository.createCustomer(
			customerData
		);

		// generate token
		const token = await this.authHelper.generateAuthToken(
			createdUser._id,
			config.jwt_secret
		);
		// add user token
		await this.userRepository.createToken(createdUser, token);
		return {
			userType: this.userConstant.userType.CUSTOMER,
			customer: createdCustomer,
			token
		};
	};

	return {
		registerCustomer
	};
};
