module.exports = function DeliveryConstant() {
	const deliveryStatus = {
		NOT_RECEIVED: 0,
		DELIVERING: 1,
		DELIVERED: 2
	};

	return {
		deliveryStatus
	};
};
