const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");
const { loginUser } = require("../controllers/auth.controllers");

const login = (req, res) => {
	const { email, password } = req.body;

	if (email && password) {
		loginUser(email, password)
			.then((response) => {
				if (response) {
					const token = jwt.sign(
						{
							id: response.id,
							email: response.email,
							role: response.role,
						},
						jwtSecret
					);
					res.status(200).json({
						message: "Correct Credentials",
						token,
					});
					console.log(token);
				} else {
					res.status(401).json({ message: "Invalid Credentials" });
				}
			})
			.catch((error) => {
				res.status(400).json({ message: error.message });
			});
	} else {
		res.status(400).json({ message: "Missing Data" });
	}
};

module.exports = {
	login,
};
