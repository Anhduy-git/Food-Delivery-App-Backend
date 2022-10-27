const fs = require('fs');

module.exports = function TransformHelper() {
	const base64Encode = (file) => {
		// read binary data
		const bitmap = fs.readFileSync(file);
		// convert binary data to base64 encoded string
		return Buffer.from(bitmap).toString('base64');
	};

	return {
		base64Encode
	};
};
