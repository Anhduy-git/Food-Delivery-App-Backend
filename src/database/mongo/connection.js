const mongoose = require('mongoose');
const { InternalServerError } = require('../../utils/errors');
const config = require('../../config');

module.exports = () => {
	mongoose.connect(config.mongodb_url);

	const db = mongoose.connection;
	db.on('error', () => {
		throw new InternalServerError('Connect to MongoDB failed');
	});
	db.once('open', () => {
		console.log('Successfully connected to mongodb cluster');
	});
};
