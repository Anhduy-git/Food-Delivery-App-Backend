const { BadRequestError } = require('../utils/errors');
const {
	UserRepository,
	ChefRepository
} = require('../database/mongo/repositories');
const { ImageStorageClient, DistanceMatrixClient } = require('../clients');
const { AuthHelper } = require('../helpers');
const { UserConstant } = require('../constants');
const config = require('../config');

module.exports = function ChefService() {
	this.userRepository = new UserRepository();
	this.chefRepository = new ChefRepository();
	this.userConstant = new UserConstant();
	this.authHelper = new AuthHelper();
	this.distanceMatrixClient = new DistanceMatrixClient();
	this.imageStorageClient = new ImageStorageClient();

	const registerChef = async ({
		phoneNumber,
		name,
		address,
		dob,
		avatar,
		idImage,
		kitchenImage
	}) => {
		const user = await this.userRepository.getUserByPhoneNumber(phoneNumber);
		// check if user exist
		if (user) {
			throw new BadRequestError('Account already exists');
		}
		// upload & get image uploaded url
		// upload avatar
		const avatarPreset = 'order_app_chef_avatar';
		const avatarUploadedURL = await this.imageStorageClient.uploadImage(
			avatar,
			avatarPreset
		);
		// upload id image
		const idImagePreset = 'order_app_chef_id';
		const idImageFrontUploadedURL = await this.imageStorageClient.uploadImage(
			idImage.front,
			idImagePreset
		);
		const idImageBackUploadedURL = await this.imageStorageClient.uploadImage(
			idImage.back,
			idImagePreset
		);
		// upload kitchen image
		const kitchenImagePreset = 'order_app_chef_kitchen';
		const kitchenImageUploadedURL = await this.imageStorageClient.uploadImage(
			kitchenImage,
			kitchenImagePreset
		);

		// create new user & freelance cook
		const userData = {
			phoneNumber,
			userType: this.userConstant.userType.CHEF
		};
		const createdUser = await this.userRepository.createUser(userData);

		const chefData = {
			userID: createdUser._id,
			name,
			phoneNumber,
			dob,
			address,
			idImage: {
				front: idImageFrontUploadedURL,
				back: idImageBackUploadedURL
			},
			kitchenImage: kitchenImageUploadedURL,
			avatar: avatarUploadedURL,
			friends: []
		};
		const createdChef = await this.chefRepository.createChef(chefData);
		// generate token
		const token = await this.authHelper.generateAuthToken(
			createdUser._id,
			config.jwt_secret
		);
		// add user token
		await this.userRepository.createToken(createdUser, token);

		return {
			userType: this.userConstant.userType.CHEF,
			chef: createdChef,
			token
		};
	};

	const getChefs = async (customerLocation, pagination) => {
		// get all meals created by FCs in database
		const chefs = await this.chefRepository.getChefs();

		// get meals within 3km
		const validDistance = 300;
		const chefLocations = [];
		// create list of destinations
		chefs.forEach((chef) => {
			chefLocations.push(chef.location);
		});
		// get list of distances
		const distances =
			await this.distanceMatrixClient.distanceMatrixMultipleDestinations(
				customerLocation,
				chefLocations
			);
		// get valid chefs
		let validChefs = [];
		for (let i = 0; i < distances.length; i++) {
			if (distances[i] <= validDistance) {
				validChefs.push(chefs[i]);
			}
		}
		// paginate data
		const limit = parseInt(pagination.limit, 10);
		const page = parseInt(pagination.page, 10);
		validChefs = validChefs.slice((page - 1) * limit, page * limit);

		return validChefs;
	};

	return {
		registerChef,
		getChefs
	};
};
