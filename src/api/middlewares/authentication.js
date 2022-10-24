const config = require('../../config');
const { AuthHelper } = require('../../helpers');
const { User } = require('../../database/mongo/models');
const { UnauthorizedError } = require('../../utils/errors');

module.exports = async (req, res, next) => {
	const authHelper = new AuthHelper();
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = await authHelper.verifyToken(token, config.jwt_secret);
		// check if user exist and token is included in tokens array
		console.log(decoded);
		const user = await User.findOne({
			_id: decoded.id,
			tokens: {
				$elemMatch: {
					$eq: token
				}
			}
		});
		if (!user) {
			throw new UnauthorizedError('Authentication failed');
		}
		req.user = user;
		req.token = token;
		next();
	} catch (err) {
		next(err);
	}
};
