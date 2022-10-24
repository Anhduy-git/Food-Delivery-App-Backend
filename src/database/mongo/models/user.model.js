const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		phoneNumber: {
			type: String,
			trim: true,
			unique: true,
			required: true
		},
		userType: {
			type: Number,
			required: true,
			min: 0,
			max: 2
		},
		tokens: [String]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', userSchema);
