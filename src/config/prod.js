module.exports = {
	port: process.env.PORT,
	mongodb_url: process.env.MONGODB_URL_PROD,
	jwt_secret: process.env.JWT_SECRET_PROD,
	cloudinary_name: process.env.CLOUDINARY_NAME_PROD,
	cloudinary_api_key: process.env.CLOUDINARY_API_KEY_PROD,
	cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET_PROD,
	goong_api_key: process.env.GOONG_API_KEY_PROD,
	twilio_account_sid: process.env.TWILIO_ACCOUNT_SID_PROD,
	twilio_auth_token: process.env.TWILIO_AUTH_TOKEN_PROD
};
