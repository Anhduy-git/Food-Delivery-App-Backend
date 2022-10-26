const amqp = require('amqplib');
const fs = require('fs');
const path = require('path');
const util = require('util');
const config = require('../config');

module.exports = function LoggingService() {
	const registerLoggingProducer = async (phoneNumber) => {
		const QUEUE = 'register';
		const amqpServer = config.rabbitmq_url;
		const connection = await amqp.connect(amqpServer);
		const channel = await connection.createChannel();
		await channel.assertQueue(QUEUE);
		await channel.sendToQueue(QUEUE, Buffer.from(phoneNumber.toString()));
		console.log(`Job sent successfully`);
		await channel.close();
		await connection.close();
	};

	const registerLoggingConsumer = async () => {
		const QUEUE = 'register';
		const amqpServer = config.rabbitmq_url;
		const connection = await amqp.connect(amqpServer);
		const channel = await connection.createChannel();
		await channel.assertQueue(QUEUE);

		channel.consume(QUEUE, (message) => {
			const data = message.content.toString();
			console.log(`Recieved logging of user ${data.phoneNumber}`);
			// write data to file
			const date = new Date();
			const curDate = `${date.getDate()}-${
				date.getMonth() + 1
			}-${date.getFullYear()}`;
			const writeData = `user_registered, ${curDate.toString()}, ${data}\n`;
			const filePath = path.join(
				__dirname,
				'..',
				'..',
				'storage',
				'events.txt'
			);
			fs.appendFile(filePath, writeData, (err) => {
				if (err) {
					return console.log(err);
				}
				console.log('The file was saved!');
			});
		});

		console.log('Waiting for messages...');
	};

	const getRegistrationLogs = async () => {
		const filePath = path.join(__dirname, '..', '..', 'storage', 'events.txt');
		const readFilePromise = util.promisify(fs.readFile);
		const data = await (await readFilePromise(filePath, 'utf8')).split('\n');
		return data;
	};

	return {
		registerLoggingProducer,
		registerLoggingConsumer,
		getRegistrationLogs
	};
};
