const app = require('./app');
const config = require('./config');
const connectToMongoDB = require('./database/mongo/connection');

app.listen(config.port, () => {
	console.log(`App listening on port ${config.port}`);
	connectToMongoDB();
});
