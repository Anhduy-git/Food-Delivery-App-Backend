const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const otpSchema = new mongoose.Schema({
	phoneNumber: {
		type: String,
		required: true
	},
	otp: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: '5m'
	}
});

// Hash the plain text otp before saving
const hashValue = 8;
otpSchema.pre('save', async function (next) {
	this.otp = await bcrypt.hash(this.otp, hashValue);
	next(); // go to save the otp
});

module.exports = mongoose.model('Otp', otpSchema);
