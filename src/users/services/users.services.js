const usersControllers = require("../controllers/users.controllers");

const getAllUsers = (req, res) => {
	usersControllers
		.getAllUsers()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((err) => {
			res.status(400).json({ message: err.messge });
		});
};

const getUserById = (req, res) => {
	const id = req.params.id;
	usersControllers
		.getUserById(id)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(400).json({ message: err.messge });
		});
};

const registerUser = (req, res) => {
	const { firstName, lastName, email, password, phone } = req.body;

	if (firstName && lastName && email && password && phone) {
		usersControllers
			.createUser({
				firstName,
				lastName,
				email,
				password,
				phone,
			})
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				res.status(400).json(err.message);
			});
	} else {
		res.status(400).json({
			message: "All fields must be completed",
			fields: {
				firstName: "string",
				lastName: "string",
				email: "example@example.com",
				password: "string",
				phone: "+541178454578",
			},
		});
	}
};

const deletUser = (req, res) => {
	const id = req.params.id;
	usersControllers
		.deletUser(id)
		.then((data) => {
			if (data) {
				res.status(204).json();
			} else {
				res.status(400).json({ message: "Invalid ID" });
			}
		})
		.catch((err) => {
			res.status(400).json({ message: err.message });
		});
};

const getMyUser = (req, res) => {
	const id = req.user.id;

	usersControllers
		.getUserById(id)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((error) => {
			res.status(400).json({ message: error.message });
		});
};

const patchMyUser = (req, res) => {
	const id = req.user.id;
	const { firstName, lastName, phone } = req.body;

	usersControllers
		.updateUser(id, {
			firstName,
			lastName,
			phone,
		})
		.then(() => {
			res.status(200).json({ message: "Your user was edited succesfully!" });
		})
		.catch((error) => {
			res.status(400).json({ message: error.message });
		});
};

const deleteMyUser = (req, res) => {
	const id = req.user.id;

	usersControllers
		.updateUser(id, { status: "inactive" })
		.then(() => {
			res.status(200).json({ message: "Your user was deleted succesfully!" });
		})
		.catch((error) => {
			res.status(400).json({ message: error.message });
		});
};

module.exports = {
	getAllUsers,
	getUserById,
	registerUser,
	deletUser,
	getMyUser,
	patchMyUser,
	deleteMyUser,
};
