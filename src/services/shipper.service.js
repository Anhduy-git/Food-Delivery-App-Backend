const { BadRequestError } = require('../utils/errors');
const {
	UserRepository,
	ShipperRepository
} = require('../database/mongo/repositories');
const { ImageStorageClient } = require('../clients');
const { AuthHelper } = require('../helpers');
const { UserConstant } = require('../constants');
const config = require('../config');

module.exports = function ShipperService() {
	this.userRepository = new UserRepository();
	this.shipperRepository = new ShipperRepository();
	this.imageStorageClient = new ImageStorageClient();
	this.authHelper = new AuthHelper();
	this.userConstant = new UserConstant();

	const registerShipper = async ({
		phoneNumber,
		name,
		address,
		dob,
		avatar,
		idImage,
		faceImage
	}) => {
		const user = await this.userRepository.getUserByPhoneNumber(phoneNumber);
		// check if user exist
		if (user) {
			throw new BadRequestError('Account already exists');
		}
		// upload & get image uploaded url
		// upload avatar
		const avatarPreset = 'order_app_shipper_avatar';
		const avatarUploadedURL = await this.imageStorageClient.uploadImage(
			avatar,
			avatarPreset
		);
		// upload id image
		const idImagePreset = 'order_app_shipper_id';
		const idImageFrontUploadedURL = await this.imageStorageClient.uploadImage(
			idImage.front,
			idImagePreset
		);
		const idImageBackUploadedURL = await this.imageStorageClient.uploadImage(
			idImage.back,
			idImagePreset
		);
		// upload face image
		const faceImagePreset = 'order_app_shipper_face';
		const faceImageLeftUploadedURL = await this.imageStorageClient.uploadImage(
			faceImage.left,
			faceImagePreset
		);
		const faceImageMidUploadedURL = await this.imageStorageClient.uploadImage(
			faceImage.mid,
			faceImagePreset
		);
		const faceImageRightUploadedURL = await this.imageStorageClient.uploadImage(
			faceImage.right,
			faceImagePreset
		);

		// create new user & freelance cook
		const userData = {
			phoneNumber,
			userType: this.userConstant.userType.SHIPPER
		};
		const createdUser = await this.userRepository.createUser(userData);
		const shipperData = {
			userID: createdUser._id,
			name,
			phoneNumber,
			dob,
			address,
			idImage: {
				front: idImageFrontUploadedURL,
				back: idImageBackUploadedURL
			},
			faceImage: {
				left: faceImageLeftUploadedURL,
				mid: faceImageMidUploadedURL,
				right: faceImageRightUploadedURL
			},
			avatar: avatarUploadedURL
		};
		const createdShipper = await this.shipperRepository.createShipper(
			shipperData
		);
		// generate token
		const token = await this.authHelper.generateAuthToken(
			createdUser._id,
			config.jwt_secret
		);
		// add user token
		await this.userRepository.createToken(createdUser, token);

		return {
			userType: this.userConstant.userType.SHIPPER,
			shipper: createdShipper,
			token
		};
	};

	return {
		registerShipper
	};
};
