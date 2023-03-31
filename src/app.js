const express = require("express");
const db = require("./utils/database");
const cors = require("cors");
const { port } = require("./config");
const userRouter = require("./users/router/users.router");
const authRouter = require("./auth/router/auth.router");
const categoryRouter = require("./categories/router/categories.router");
const productsRouter = require("./products/router/products.router");
const purchasesRouter = require("./purchases/router/purchases.router");
const shoppingCartRouter = require("./shopping_cart/router/shoppingCart.router");
const initModels = require("./models/initModels");

const app = express();

app.use(express.json());

app.use(cors());

db.authenticate()
	.then(() => {
		console.log("Database Authenticated");
	})
	.catch((err) => {
		console.log(err);
	});

db.sync()
	.then(() => {
		console.log("Database Synced");
	})
	.catch((err) => {
		console.log(err);
	});

initModels();

app.get("/", (req, res) => {
	res.status(200).json({
		message: "OK!",
		users: `localhost:${port}/api/v1/users`,
	});
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/purchases", purchasesRouter);
app.use("/api/v1/shopping_cart", shoppingCartRouter);

app.listen(port, () => {
	console.log(`Server started at port ${port}`);
});

// server.on("error", (error) => {
// 	console.error("Error de servidor:", error);
// });
