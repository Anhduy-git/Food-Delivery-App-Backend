const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema(
	{
		chef: {
			_id: false,
			type: {
				id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Chef'
				},
				name: {
					type: String
				},
				phoneNumber: {
					type: String
				},
				avatar: {
					type: String
				},
				address: {
					type: String
				}
			},
			required: true
		},
		name: {
			type: String,
			trim: true,
			required: true
		},
		description: {
			type: String
		},
		price: {
			type: Number,
			required: true
		},
		saleDate: {
			type: Date,
			default: Date.now()
		},
		image: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
