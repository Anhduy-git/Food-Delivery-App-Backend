const { UnauthorizedError } = require('../utils/errors');
const {
	UserRepository,
	OTPRepository,
	CustomerRepository,
	ChefRepository,
	ShipperRepository
} = require('../database/mongo/repositories');
const { SMSClient } = require('../clients');
const { AuthHelper } = require('../helpers');
const { UserConstant } = require('../constants');
const config = require('../config');

module.exports = function AuthService() {
	this.userRepository = new UserRepository();
	this.otpRepository = new OTPRepository();
	this.customerRepository = new CustomerRepository();
	this.chefRepository = new ChefRepository();
	this.shipperRepository = new ShipperRepository();
	this.authHelper = new AuthHelper();
	this.smsClient = new SMSClient();
	this.userConstant = new UserConstant();

	const loginUser = async (phoneNumber) => {
		const user = await this.userRepository.getUserByPhoneNumber(phoneNumber);
		if (!user) {
			throw new UnauthorizedError('Phone number not found');
		}
		// generate otp
		const numDigits = 4;
		const otpVal = await this.authHelper.generateOTP(numDigits);
		console.log(otpVal);
		// store otp
		const otpData = {
			phoneNumber,
			otp: otpVal
		};
		await this.otpRepository.createOTP(otpData);
		// //Format phone number
		// phoneNumber = phoneNumber.slice(1);
		// phoneNumber = '+84' + phoneNumber;
		// //sens sms to users
		// const body = `OTP của bạn là: ${otpVal}`;
		// const from = '+18336934263'; //twilio phone number
		// const to = phoneNumber;
		// this.smsClient.sendSMS(body, from, to);
	};

	const verifyOTP = async (otp, phoneNumber) => {
		const otps = await this.otpRepository.getOTPs(phoneNumber);

		if (otps.length === 0) {
			throw new UnauthorizedError('Expired OTP!');
		}
		const lastOTP = otps[otps.length - 1];
		// check if otp is valid
		const isMatch = await this.authHelper.compareHashing(otp, lastOTP.otp);
		if (!isMatch) {
			throw new UnauthorizedError('Invalid OTP!');
		}
		// Login successfully, delete unecessaries otps, send token
		await this.otpRepository.deleteAllOTPs(phoneNumber);

		const user = await this.userRepository.getUserByPhoneNumber(phoneNumber);
		if (!user) {
			throw new UnauthorizedError('User not exist!');
		}
		// generate token
		const token = await this.authHelper.generateAuthToken(
			user._id,
			config.jwt_secret
		);
		// add user token
		await this.userRepository.createToken(user, token);

		// get specific user information
		if (user.userType === this.userConstant.userType.CUSTOMER) {
			const customer = await this.customerRepository.getCustomerByUserID(
				user.id
			);
			return {
				userType: this.userConstant.userType.CUSTOMER,
				customer,
				token
			};
		}
		if (user.userType === this.userConstant.userType.CHEF) {
			const chef = await this.chefRepository.getChefByUserID(user.id);
			return {
				userType: this.userConstant.userType.CHEF,
				chef,
				token
			};
		}
		if (user.userType === this.userConstant.userType.SHIPPER) {
			const shipper = await this.shipperRepository.getShipperByUserID(user.id);
			return {
				userType: this.userConstant.userType.SHIPPER,
				shipper,
				token
			};
		}
		return undefined;
	};

	const logoutUser = async (user, token) => {
		// remove token
		await this.userRepository.deleteToken(user, token);
	};

	return {
		loginUser,
		verifyOTP,
		logoutUser
	};
};
