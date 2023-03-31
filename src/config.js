require("dotenv").config();

const config = {
	port: process.env.PORT || 3000,
	nodeEnv: process.env.NODE_ENV || "development",
	jwtSecret: process.env.JWT_SECRET,
	db: {
		host: process.env.DB_HOST || "localhost",
		username: process.env.DB_USER || "root",
		password: process.env.DB_PASS || "",
		dbName: process.env.DB_NAME,
	},
};

module.exports = config;
