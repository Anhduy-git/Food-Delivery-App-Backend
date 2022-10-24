const { Shipper } = require('../models');

module.exports = function ShipperRepository() {
	const createShipper = async (data) => {
		const shipper = await Shipper.create(data);
		return shipper;
	};
	const getShipperByID = async (id) => {
		const shipper = await Shipper.findById(id);
		return shipper;
	};
	const getShipperByUserID = async (userID) => {
		const shipper = await Shipper.findOne({ userID });
		return shipper;
	};

	return {
		createShipper,
		getShipperByID,
		getShipperByUserID
	};
};
