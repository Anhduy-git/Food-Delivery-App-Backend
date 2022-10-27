const mongoose = require('mongoose');
const fetch = require('node-fetch');
const config = require('../../../config');

const shipperSchema = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		unique: true,
		ref: 'User'
	},
	name: {
		type: String,
		trim: true,
		required: true
	},
	dob: {
		type: Date,
		required: true
	},
	phoneNumber: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},
	avatar: {
		type: String
	},
	idImage: {
		_id: false,
		type: {
			front: {
				type: String
			},
			back: {
				type: String
			}
		},
		required: true
	},
	faceImage: {
		_id: false,
		type: {
			left: {
				type: String
			},
			mid: {
				type: String
			},
			right: {
				type: String
			}
		},
		required: true
	}
});

module.exports = mongoose.model('Shipper', shipperSchema);
