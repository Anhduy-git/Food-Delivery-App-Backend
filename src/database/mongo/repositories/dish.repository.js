const { Dish } = require('../models');

module.exports = function DishRepository() {
	const createDish = async (data) => {
		const dish = await Dish.create(data);
		return dish;
	};

	const getDishesByChefID = async (chefID, pagination) => {
		const { limit } = pagination;
		const { page } = pagination;
		const dishes = await Dish.find({
			'chef.id': chefID
		})
			.limit(limit)
			.skip(limit * (page - 1));
		return dishes;
	};

	return {
		createDish,
		getDishesByChefID
	};
};
