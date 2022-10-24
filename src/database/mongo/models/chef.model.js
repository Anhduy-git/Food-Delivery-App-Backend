const mongoose = require('mongoose');
const fetch = require('node-fetch');
const config = require('../../../config');

const chefSchema = new mongoose.Schema({
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
	address: {
		type: String,
		required: true
	},
	location: {
		_id: false,
		type: {
			lat: Number,
			lng: Number
		}
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
	kitchenImage: {
		type: String,
		required: true
	},
	friends: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Chef'
			}
		],
		required: true
	}
});

chefSchema.pre('save', async function (next) {
	if (this.isModified('address')) {
		const { address } = this;
		const addressEncoded = encodeURIComponent(address);
		const url = `https://rsapi.goong.io/geocode?address=${addressEncoded}&api_key=${config.goong_api_key}`;
		const res = await fetch(url);
		const data = await res.json();
		this.location = {
			lat: data.results[0].geometry.location.lat,
			lng: data.results[0].geometry.location.lng
		};
	}
	next(); // go to save FC
});

module.exports = mongoose.model('Chef', chefSchema);
