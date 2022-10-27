const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {
	User,
	Customer,
	Chef,
	Shipper,
	Delivery,
	Order,
	Dish
} = require('../../database/mongo/models');
const {
	UserConstant,
	OrderConstant,
	DeliveryConstant
} = require('../../constants');
const config = require('../../config');

const userConstant = new UserConstant();
const orderConstant = new OrderConstant();
const deliveryConstant = new DeliveryConstant();

// Test database with 3 user: 1 customer, 1 chef, 1 shipper.
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	phoneNumber: '0589934859',
	userType: userConstant.userType.CUSTOMER,
	tokens: [jwt.sign({ id: userOneId }, config.jwt_secret)]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
	_id: userTwoId,
	phoneNumber: '0589934858',
	userType: userConstant.userType.CHEF,
	tokens: [jwt.sign({ id: userTwoId }, config.jwt_secret)]
};

const userThreeId = new mongoose.Types.ObjectId();
const userThree = {
	_id: userThreeId,
	phoneNumber: '0589934857',
	userType: userConstant.userType.SHIPPER,
	tokens: [jwt.sign({ id: userThreeId }, config.jwt_secret)]
};

const customerId = new mongoose.Types.ObjectId();
const customer = {
	_id: customerId,
	userID: userOneId,
	name: 'Anh Duy Customer',
	dob: '04/08/2002',
	phoneNumber: '0589934859',
	address: 'Kí túc xá 135b Trần hưng đạo, quận 5, thành phố Hồ Chí Minh',
	avatar:
		'https://res.cloudinary.com/dkgkiwvpm/image/upload/v1666847754/als1ihkugufvluwwz3of.png',
	location: {
		lat: 10.7671353,
		lng: 106.6949604
	}
};

const chefId = new mongoose.Types.ObjectId();
const chef = {
	_id: chefId,
	userID: userTwoId,
	name: 'Anh Duy Chef',
	dob: '04/08/2002',
	phoneNumber: '0589934858',
	address: 'Kí túc xá 135b Trần hưng đạo, quận 5, thành phố Hồ Chí Minh',
	friends: [],
	avatar:
		'https://res.cloudinary.com/dkgkiwvpm/image/upload/v1666847754/als1ihkugufvluwwz3of.png',
	idImage: {
		front:
			'https://res.cloudinary.com/dkgkiwvpm/image/upload/v1666638936/vmrdra6drmmswknbslro.jpg',
		back: 'https://res.cloudinary.com/dkgkiwvpm/image/upload/v1666638938/ky9o77dfv1mw9fyiz0ox.jpg'
	},
	kitchenImage:
		'https://res.cloudinary.com/dkgkiwvpm/image/upload/v1666638941/thps0b3ow8kywi5pu8qm.jpg',
	location: {
		lat: 10.7671353,
		lng: 106.6949604
	}
};

const shipperId = new mongoose.Types.ObjectId();
const shipper = {
	_id: shipperId,
	userID: userThreeId,
	name: 'Anh Duy Shipper',
	dob: '04/08/2002',
	phoneNumber: '0589934857',
	avatar:
		'https://res.cloudinary.com/dkgkiwvpm/image/upload/v1666847754/als1ihkugufvluwwz3of.png',
	idImage: {
		front:
			'https://res.cloudinary.com/dkgkiwvpm/image/upload/v1666638936/vmrdra6drmmswknbslro.jpg',
		back: 'https://res.cloudinary.com/dkgkiwvpm/image/upload/v1666638938/ky9o77dfv1mw9fyiz0ox.jpg'
	},
	faceImage: {
		left: 'https://res.cloudinary.com/dkgkiwvpm/image/upload/v1666849894/jqcfylgrknkffqth2v8n.png',
		mid: 'https://res.cloudinary.com/dkgkiwvpm/image/upload/v1666849897/tjaag3x42rwz2tp9bg62.png',
		right:
			'https://res.cloudinary.com/dkgkiwvpm/image/upload/v1666849899/prrau37lycdv5qsyee68.png'
	}
};

const dishId = new mongoose.Types.ObjectId();
const dish = {
	_id: dishId,
	chef: {
		id: customer._id,
		name: customer.name,
		phoneNumber: customer.phoneNumber,
		avatar: customer.avatar,
		address: customer.address
	},
	name: 'Ga chien',
	description: 'gà, bột chiên giòn, dầu ăn',
	price: 300,
	saleDate: '2022-10-27T06:00:00.413+00:00',
	image:
		'https://res.cloudinary.com/dkgkiwvpm/image/upload/v1666850410/dlfikkzebe46rvnidhlf.png'
};

const orderId = new mongoose.Types.ObjectId();
const order = {
	_id: orderId,
	customer: {
		id: customer._id,
		name: customer.name,
		phoneNumber: customer.phoneNumber,
		avatar: customer.avatar,
		address: customer.address,
		location: customer.location
	},
	chef: {
		id: chef._id,
		name: chef.name,
		phoneNumber: chef.phoneNumber,
		avatar: chef.avatar,
		address: chef.address,
		location: chef.location
	},
	dishes: [
		{
			name: dish.name,
			description: dish.description,
			quantity: 2,
			price: dish.price,
			image: dish.image
		}
	],
	totalPrice: dish.price * 2,
	orderTime: '2022-10-27T05:55:04.870+00:00',
	status: orderConstant.orderStatus.RECEIVED_AND_COOKING
};

const deliveryId = new mongoose.Types.ObjectId();
const delivery = {
	_id: deliveryId,
	order: {
		id: order._id,
		customer: order.customer,
		chef: order.chef,
		totalPrice: order.totalPrice,
		orderTime: order.orderTime
	},
	deliveryTime: '2022-10-27T05:55:04.878+00:00',
	fee: 60,
	status: deliveryConstant.deliveryStatus.NOT_RECEIVED
};

const setupDatabase = async () => {
	console.log('setup');
	await User.deleteMany();
	await Customer.deleteMany();
	await Chef.deleteMany();
	await Shipper.deleteMany();
	await Order.deleteMany();
	await Delivery.deleteMany();
	await Dish.deleteMany();
	await new User(userOne).save();
	await new User(userTwo).save();
	await new User(userThree).save();
	await new Customer(customer).save();
	await new Chef(chef).save();
	await new Shipper(shipper).save();
	await new Dish(dish).save();
	await new Delivery(delivery).save();
	await new Order(order).save();
};

module.exports = {
	setupDatabase
};
