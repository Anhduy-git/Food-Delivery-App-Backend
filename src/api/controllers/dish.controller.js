const { DishService } = require('../../services');
const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');

module.exports = function DishController() {
	this.dishService = new DishService();
	// [POST] /dishes
	const createDish = async (req, res, next) => {
		try {
			await this.dishService.createDish(req.body);
			res.status(StatusCodes.OK).json(new Response({ status: true }));
		} catch (err) {
			next(err);
		}
	};

	// [GET] /dishes/?chefID=123&dishType=0&page=1&limit=5
	const getDishes = async (req, res, next) => {
		try {
			const { chefID } = req.query;
			const limit = parseInt(req.query.limit, 10);
			const page = parseInt(req.query.page, 10);
			const pagination = { limit, page };
			const dishes = await this.dishService.getDishesOfChef(chefID, pagination);
			res
				.status(StatusCodes.OK)
				.json(new Response({ status: true, content: dishes }));
		} catch (err) {
			next(err);
		}
	};

	return {
		createDish,
		getDishes
	};
};
