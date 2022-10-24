const cloudinary = require('cloudinary').v2;
const config = require('../config');

cloudinary.config({
	cloud_name: config.cloudinary_name,
	api_key: config.cloudinary_api_key,
	api_secret: config.cloudinary_api_secret
});

module.exports = function ImageStorageClient() {
	const uploadImage = async (strBase64, uploadPreset) => {
		const uploadedRes = await cloudinary.uploader.upload(strBase64, {
			uploadPreset
		});
		return uploadedRes.secure_url;
	};

	return {
		uploadImage
	};
};
