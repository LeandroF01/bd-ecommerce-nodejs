const { getUserByEmail } = require("../../users/controllers/users.controllers");
const { comparePassword } = require("../../utils/crypto");

const loginUser = async (email, password) => {
	try {
		const user = await getUserByEmail(email);

		const verifyPassword = comparePassword(password, user.password);
		if (verifyPassword) {
			return user;
		}
		return false;
	} catch (err) {
		return false;
	}
};

module.exports = {
	loginUser,
};
