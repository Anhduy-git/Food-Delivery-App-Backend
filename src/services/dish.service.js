const {
	DishRepository,
	ChefRepository
} = require('../database/mongo/repositories');
const { ImageStorageClient } = require('../clients');
const { BadRequestError } = require('../utils/errors');

module.exports = function DishService() {
	this.dishRepository = new DishRepository();
	this.chefRepository = new ChefRepository();
	this.imageStorageClient = new ImageStorageClient();

	const createDish = async ({ chef, name, description, price, image }) => {
		// upload & get image uploaded url
		const dishImagePreset = 'order_app_dish_image';
		const dishImageUploadedURL = await this.imageStorageClient.uploadImage(
			image,
			dishImagePreset
		);

		const dishData = {
			chef,
			name,
			description,
			price,
			image: dishImageUploadedURL
		};
		await this.dishRepository.createDish(dishData);
	};

	const getDishesOfChef = async (chefID, pagination) => {
		// check if freelance cook exists
		const chef = await this.chefRepository.getChefByID(chefID);
		if (!chef) {
			throw new BadRequestError(`Chef ${chefID} does not exist`);
		}
		const dishes = await this.dishRepository.getDishesByChefID(
			chefID,
			pagination
		);
		return dishes;
	};

	return {
		createDish,
		getDishesOfChef
	};
};
