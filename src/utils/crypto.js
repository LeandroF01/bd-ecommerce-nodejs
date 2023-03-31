const bcrypt = require("bcrypt");

const hashPassword = (plainPasssword) => {
	return bcrypt.hashSync(plainPasssword, 10);
};

const comparePassword = (plainPasssword, hashedPassword) => {
	return bcrypt.compareSync(plainPasssword, hashedPassword);
};

module.exports = {
	hashPassword,
	comparePassword,
};
