const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema(
	{
		shipper: {
			_id: false,
			type: {
				id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Shipper'
				},
				name: String,
				phoneNumber: String,
				avatar: String
			}
		},
		order: {
			_id: false,
			type: {
				id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Order'
				},
				customer: {
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
				chef: {
					id: {
						type: mongoose.Schema.Types.ObjectId,
						required: true,
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
				totalPrice: {
					type: Number
				},
				orderTime: {
					type: Date
				}
			},
			required: true
		},
		deliveryTime: {
			type: Date,
			default: Date.now()
		},
		fee: {
			type: Number,
			required: true
		},
		status: {
			type: Number,
			default: 0,
			min: 0,
			max: 2
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Delivery', deliverySchema);
