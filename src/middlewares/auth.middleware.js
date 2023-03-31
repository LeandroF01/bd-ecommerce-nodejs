const JwtStrategy = require("passport-jwt").Strategy;

const ExtractJwt = require("passport-jwt").ExtractJwt;

const { jwtSecret } = require("../config");
const { getUserById } = require("../users/controllers/users.controllers");

const options = {
	secretOrKey: jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
};

module.exports = (passport) => {
	// passport.use(
	// 	new JwtStrategy(options, async (decoded, done) => {
	// 		try {
	// 			const response = await getUserById(decoded.id);
	// 			if (!response) {
	// 				return done(null, false);
	// 			}
	// 			console.log("Decoded JWT", decoded);
	// 			return done(null, decoded);
	// 		} catch (error) {
	// 			return done(error, false);
	// 		}
	// 	})
	// );
	passport.use(
		new JwtStrategy(options, async (decoded, done) => {
			console.log("Decoded JWT:", decoded); // Imprime información sobre el token decodificado

			try {
				const user = await getUserById(decoded.id);
				if (!user) {
					console.log("User not found"); // Imprime si el usuario no fue encontrado
					return done(null, false);
				}
				console.log("User found:", user); // Imprime información sobre el usuario encontrado

				return done(null, user);
			} catch (error) {
				console.log("Error:", error); // Imprime si hubo un error al buscar al usuario
				return done(error, false);
			}
		})
	);
};
