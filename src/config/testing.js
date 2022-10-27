module.exports = {
	port: process.env.PORT,
	mongodb_url: process.env.MONGODB_URL_TEST,
	rabbitmq_url: process.env.RABBITMQ_URL_TEST,
	jwt_secret: process.env.JWT_SECRET_TEST,
	cloudinary_name: process.env.CLOUDINARY_NAME_TEST,
	cloudinary_api_key: process.env.CLOUDINARY_API_KEY_TEST,
	cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET_TEST,
	goong_api_key: process.env.GOONG_API_KEY_TEST,
	twilio_account_sid: process.env.TWILIO_ACCOUNT_SID_TEST,
	twilio_auth_token: process.env.TWILIO_AUTH_TOKEN_TEST
};
