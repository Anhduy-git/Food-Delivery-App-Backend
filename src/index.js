const app = require('./app');
const config = require('./config');
const connectToMongoDB = require('./database/mongo/connection');
const LoggingService = require('./services/logging.service');

const loggingService = new LoggingService();

app.listen(config.port, () => {
	console.log(`App listening on port ${config.port}`);
	connectToMongoDB();
	loggingService.registerLoggingConsumer();
});
