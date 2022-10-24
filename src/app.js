const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const Emitter = require('events');
const http = require('http');
const routes = require('./api/routes');
const { errorHandlerMiddleware } = require('./api/middlewares');
const { NotFoundError } = require('./utils/errors');

const API_PREFIX = '/api/v1';

const app = express();

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(
	express.urlencoded({
		extended: true
	})
);
// CORS
app.use(cors());

// Event emitter
const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);

// Routes
app.use(API_PREFIX, routes());

// No route is found
app.use((req, res, next) => {
	throw new NotFoundError('URL not found!');
});

// Common Error Handler
app.use(errorHandlerMiddleware);

// http server
const httpServer = http.createServer(app);

// socket
const io = socketio(httpServer);
io.on('connection', (socket) => {
	// Join
	socket.on('join', (roomName) => {
		socket.join(roomName);
	});
});
// notify new order created
eventEmitter.on('orderCreated', (order) => {
	const chefID = order.chef.id.toString();
	io.to(`chef_${chefID}_orders`).emit('orderCreated', order);
});
// notify new delivery created
eventEmitter.on('deliveryCreated', () => {
	io.to(`deliveries`).emit('deliveryCreated');
});

module.exports = app;
