const { response, request } = require("express");
const { Category } = require("../models");

const getCategories = async (req = request, res = response) => {
	try {
		const categorys = await Category.find().populate("user");
		res.status(200).json(categorys);
	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred getting the categorys in the controller",
			error,
		});
	}
};

const getCategoriesPaginated = async (req = request, res = response) => {
	try {
		// get the query params
		const { limit = 5, offset = 0 } = req.query;

		// define de status of the categorys to get
		const query = { status: true };

		// get the count and the categorys
		const [total, categorys] = await Promise.all([
			Category.countDocuments(query),
			Category.find(query).populate("user").skip(offset).limit(limit),
		]);

		// return the total and categorys
		res.json({
			total,
			categorys,
		});
	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred getting the categorys paginated in the controller",
			error,
		});
	}
};

const getOneCategory = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		const category = await Category.findById(id).populate("user");
		res.status(200).json(category);
	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred getting the categorys paginated in the controller",
			error,
		});
	}
};

const createCategory = async (req = request, res = response) => {
	try {
		// get the name, and set it to upper case
		const name = req.body.name.toUpperCase();

		// validate if name is already in use
		const catDB = await Category.find({ name });

		if (catDB.length > 0) {
			res.status(401).json({
				msg: "Name for category already in use",
			});
			return;
		}

		// set the data for the new category
		const data = {
			name,
			user: req.userAuthInfo._id,
		};

		// save the data
		const newCat = new Category(data);
		await newCat.save();

		res.status(201).json({
			message: "Created succesfully",
			category: newCat,
		});
	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred when creating the category in the controller",
			error,
		});
	}
};

const updateCategory = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		let { name } = req.body;

		// format name to upper case
		name = name.toUpperCase();

		// validate if is already in use
		const actual = await Category.find({ name });

		if (actual.length > 0) {
			res.status(400).json({
				message: `Category with name = ${name} already exists`,
			});
			return;
		}

		// set the data to update
		const data = {
			name,
		};

		const category = await Category.findByIdAndUpdate(id, data);

		return res.status(200).json(category);
	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred when updating the category in the controller",
			error,
		});
	}
};

const deleteCategory = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		const categoryDel = await Category.findByIdAndUpdate(id, {
			status: false,
		});
		res.json(categoryDel);
	} catch (error) {
		res.status(400).json({
			message:
				"An error has ocurred when updating the category in the controller",
			error,
		});
	}
};

module.exports = {
	getCategories,
	getCategoriesPaginated,
	getOneCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};
