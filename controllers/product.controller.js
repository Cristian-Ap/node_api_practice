const { response, request } = require("express");
const { Product } = require("../models");

const getProducts = async (req = request, res = response) => {
	try {
		const products = await Product.find().populate('category');

		res.status(200).json(products);

	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred getting the products in the controller",
			error,
		});
	}
};

const getProductsPaginated = async(req = request, res = response) => {
	try {
		// get the query params
		const { limit = 5, offset = 0 } = req.query;

		// define de status of the products to get
		const query = { status: true };

		// get the count and the products
		const [total, products] = await Promise.all([
			Product.countDocuments(query),
			Product.find(query).populate("category").skip(offset).limit(limit),
		]);

		// return the total and products
		res.json({
			total,
			products,
		});
	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred getting the categorys paginated in the controller",
			error,
		});
	}
}

const getOneProduct = async(req = request, res = response) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id).populate("category");
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred getting the product in the controller",
			error,
		});
	}
}

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

const updateProduct = async (req = requests, res = response) => {
	try {
		const { id } = req.params;
		const { name, description, price, stock, category } = req.body;

		const nameUpper = name.toUpperCase();

		const productExist = await Product.find({ name: nameUpper });

		if (productExist.length > 0) {
			res.status(401).json({
				message: "Name for product already in use"
			})
			return;
		}

		// set the data to update
		const data = {
			name: nameUpper,
			description,
			price,
			stock,
			category,
			user: req.userAuthInfo._id,
		}

		const productUpdated = await Product.findByIdAndUpdate(id, data);

		return res.status(200).json(productUpdated);
	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred updating the product in the controller",
			error,
		});
	}
}

const deleteProduct = async (req = requests, res = response) => {
	try {
		const { id } = req.params;
		const productDel = await Product.findByIdAndUpdate(id, {
			status: false,
		});
		res.json(productDel);
	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred deleting the products in the controller",
			error,
		});
	}
}

module.exports = {
	getProducts,
	getProductsPaginated,
	getOneProduct,
	createProduct,
	updateProduct,
	deleteProduct
};
