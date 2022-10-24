const {
	DeliveryRepository,
	ShipperRepository
} = require('../database/mongo/repositories');
const { DistanceMatrixClient } = require('../clients');
const { BadRequestError } = require('../utils/errors');

module.exports = function DeliveryService() {
	this.deliveryRepository = new DeliveryRepository();
	this.shipperRepository = new ShipperRepository();
	this.distanceMatrixClient = new DistanceMatrixClient();

	const updateDelivery = async (deliveryID, newData) => {
		// check if delivery exists
		const delivery = await this.deliveryRepository.getDeliveryByID(deliveryID);
		if (!delivery) {
			throw new BadRequestError(`Delivery ${deliveryID} does not exist`);
		}
		// update delivery time
		newData.deliveryTime = Date.now();
		await this.deliveryRepository.updateDelivery(deliveryID, newData);
	};

	const getDeliveriesNotDelivered = async (pagination) => {
		let deliveries =
			await this.deliveryRepository.getDeliveriesWithUndefinedShipper();

		// paginate data
		const limit = parseInt(pagination.limit, 10);
		const page = parseInt(pagination.page, 10);
		deliveries = deliveries.slice((page - 1) * limit, page * limit);
		return deliveries;
	};

	const getDeliveriesOfShipper = async (shipperID, pagination) => {
		// check if shipper exists
		const shipper = await this.shipperRepository.getShipperByID(shipperID);
		if (!shipper) {
			throw new BadRequestError(`Shipper ${shipperID} does not exist`);
		}
		const deliveries = await this.deliveryRepository.getDeliveriesByShipperID(
			shipperID,
			pagination
		);
		return deliveries;
	};

	return {
		updateDelivery,
		getDeliveriesNotDelivered,
		getDeliveriesOfShipper
	};
};
