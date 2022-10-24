const { AuthService } = require('../../services');
const { InternalServerError } = require('../../utils/errors');
const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');

module.exports = function AuthController() {
	this.authService = new AuthService();
	// [POST] /auth/login
	const loginUser = async (req, res, next) => {
		try {
			const { phoneNumber } = req.body;
			await this.authService.loginUser(phoneNumber);
			res.status(StatusCodes.OK).json(new Response({ status: true }));
		} catch (err) {
			next(err);
		}
	};
	// [POST] /auth/verify-otp
	const verifyOTP = async (req, res, next) => {
		try {
			const { phoneNumber, otp } = req.body;
			const result = await this.authService.verifyOTP(otp, phoneNumber);
			if (!result) {
				throw new InternalServerError('Internal server error !');
			}
			res
				.status(StatusCodes.OK)
				.json(new Response({ status: true, content: result }));
		} catch (err) {
			next(err);
		}
	};

	// [POST] /auth/logout
	const logoutUser = async (req, res, next) => {
		try {
			await this.authService.logoutUser(req.user, req.token);
			res.status(StatusCodes.OK).json(new Response({ status: true }));
		} catch (err) {
			next(err);
		}
	};
	return {
		loginUser,
		verifyOTP,
		logoutUser
	};
};
