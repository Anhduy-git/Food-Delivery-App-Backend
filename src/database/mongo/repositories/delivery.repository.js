const { Delivery } = require('../models');

module.exports = function DeliveryRepository() {
	const getDeliveriesByShipperID = async (shipperID, pagination) => {
		const { limit } = pagination;
		const { page } = pagination;
		const deliveries = await Delivery.find({
			'shipper.id': shipperID
		})
			.limit(limit)
			.skip(limit * (page - 1));

		return deliveries;
	};
	const getDeliveryByID = async (id) => {
		const delivery = await Delivery.findById(id);
		return delivery;
	};

	const getDeliveriesWithUndefinedShipper = async () => {
		const deliveries = await Delivery.find({
			shipper: undefined,
			status: 0
		});
		return deliveries;
	};

	const createDelivery = async (data) => {
		const delivery = await Delivery.create(data);
		return delivery;
	};
	const updateDelivery = async (deliveryID, newData) => {
		await Delivery.findOneAndUpdate(
			{
				_id: deliveryID
			},
			newData
		);
	};
	return {
		getDeliveriesByShipperID,
		getDeliveryByID,
		getDeliveriesWithUndefinedShipper,
		createDelivery,
		updateDelivery
	};
};
