const { Chef } = require('../models');

module.exports = function ChefRepository() {
	const createChef = async (data) => {
		const chef = await Chef.create(data);
		return chef;
	};
	const getChefByID = async (id) => {
		const chef = await Chef.findById(id);
		return chef;
	};
	const getChefByUserID = async (userID) => {
		const chef = await Chef.findOne({ userID });
		return chef;
	};

	const getChefs = async () => {
		const chefs = await Chef.find({});
		return chefs;
	};

	return {
		createChef,
		getChefByID,
		getChefByUserID,
		getChefs
	};
};
