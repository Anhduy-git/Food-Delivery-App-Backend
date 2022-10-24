const twilio = require('twilio');
const config = require('../config');

const client = twilio(config.twilio_account_sid, config.twilio_auth_token);

module.exports = function SMSClient() {
	const sendSMS = async (body, from, to) => {
		client.messages
			.create({
				body,
				from,
				to
			})
			.then((message) => console.log(message))
			.catch((error) => console.log(error));
	};

	return {
		sendSMS
	};
};
