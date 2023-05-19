const { response, request } = require("express");
const { Product } = require("../models");

const getProducts = async (req = request, res = response) => {
	try {

		const products = await Product.find();

		res.status(200).json(products);

	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred getting the products in the controller",
			error,
		});
	}
};

const createProduct = async (req = requests, res = response) => {
	try {
		const { name, description, price, stock, category } = req.body;

		const nameUpper = name.toUpperCase();

		const productExist = await Product.find({ name: nameUpper });

		if (productExist.length > 0) {
			res.status(401).json({
				message: "Name for product already in use"
			})
			return;
		}

		const data = {
			name: nameUpper,
			description,
			price,
			stock,
			category,
			user: req.userAuthInfo._id,
		}

		const newProduct = new Product(data);
		await newProduct.save();

		res.status(201).json(newProduct);

	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred creasting the products in the controller",
			error,
		});
	}
};

module.exports = {
	getProducts,
	createProduct
};
