const express = require("express");
const cors = require("cors");
const routesPath = require("../routes/routesPath");
const { dbConnection } = require("../database/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.databaseConection();
		this.middlewares();
		this.routes();
	}

	// global middlewares 
	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static("public"));
	}

	async databaseConection() {
		await dbConnection();
	}

	// routes for the api
	routes() {
		this.app.use(routesPath.AUTH, require("../routes/auth.routes"));
		this.app.use(routesPath.CATEGORIES, require("../routes/categories.routes"));
		this.app.use(routesPath.PRODUCTS, require("../routes/product.routes"));
		this.app.use(routesPath.USERS, require("../routes/user.routes"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("sever listen ", this.port);
		});
	}
}

module.exports = Server;
