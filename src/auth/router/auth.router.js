const router = require("express").Router();
const authServices = require("../services/auth.services");
const { registerUser } = require("../../users/services/users.services");

router.post("/register", registerUser);

router.post("/login", authServices.login);

module.exports = router;
