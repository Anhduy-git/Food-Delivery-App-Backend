module.exports = function OrderConstant() {
	const orderStatus = {
		RECEIVED_AND_COOKING: 0,
		FINISHED: 1,
		DELIVERING: 2
	};

	return {
		orderStatus
	};
};
