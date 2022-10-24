const { OTP } = require('../models');

module.exports = function OTPRepository() {
	const createOTP = async (data) => {
		const otp = await OTP.create(data);
		return otp;
	};
	const getOTPs = async (phoneNumber) => {
		const otps = await OTP.find({ phoneNumber });
		return otps;
	};

	const deleteAllOTPs = async (phoneNumber) => {
		await OTP.deleteMany({ phoneNumber });
	};

	return {
		createOTP,
		getOTPs,
		deleteAllOTPs
	};
};
