module.exports = {
	port: process.env.PORT,
	mongodb_url: process.env.MONGODB_URL_DEV,
	rabbitmq_url: process.env.RABBITMQ_URL_DEV,
	jwt_secret: process.env.JWT_SECRET_DEV,
	cloudinary_name: process.env.CLOUDINARY_NAME_DEV,
	cloudinary_api_key: process.env.CLOUDINARY_API_KEY_DEV,
	cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET_DEV,
	goong_api_key: process.env.GOONG_API_KEY_DEV,
	twilio_account_sid: process.env.TWILIO_ACCOUNT_SID_DEV,
	twilio_auth_token: process.env.TWILIO_AUTH_TOKEN_DEV
};
