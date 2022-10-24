const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		customer: {
			_id: false,
			type: {
				id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Customer'
				},
				name: String,
				phoneNumber: String,
				avatar: String,
				address: String,
				location: {
					_id: false,
					type: {
						lat: Number,
						lng: Number
					}
				}
			},
			required: true
		},
		chef: {
			_id: false,
			type: {
				id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Chef'
				},
				name: String,
				phoneNumber: String,
				avatar: String,
				address: String,
				location: {
					_id: false,
					type: {
						lat: Number,
						lng: Number
					}
				}
			},
			required: true
		},
		dishes: {
			_id: false,
			type: [
				{
					name: {
						type: String
					},
					description: {
						type: String
					},
					quantity: {
						type: Number
					},
					price: {
						type: Number
					},
					image: {
						type: String
					}
				}
			],
			required: true
		},
		totalPrice: {
			type: Number,
			required: true
		},
		orderTime: {
			type: Date,
			default: Date.now()
		},
		status: {
			type: Number,
			min: 0,
			max: 2,
			default: 0
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Order', orderSchema);
