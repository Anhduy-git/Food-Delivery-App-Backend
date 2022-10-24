const { User } = require('../models');

module.exports = function UserRepository() {
	const createUser = async (data) => {
		const user = await User.create(data);
		return user;
	};

	const getUserByPhoneNumber = async (phoneNumber) => {
		const user = await User.findOne({ phoneNumber });
		return user;
	};
	const getUserByID = async (userID) => {
		const user = await User.findOne({ _id: userID });
		return user;
	};
	const deleteToken = async (userID, tokenToDelete) => {
		const user = await User.findById(userID);
		user.tokens = user.tokens.filter((token) => token !== tokenToDelete);
		await user.save();
	};
	const createToken = async (userID, token) => {
		const user = await User.findById(userID);
		user.tokens = user.tokens.concat(token);
		await user.save();
	};
	return {
		createUser,
		getUserByPhoneNumber,
		getUserByID,
		deleteToken,
		createToken
	};
};
