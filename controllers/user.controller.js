const { response, request } = require("express");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");

const getUsers = async (req, res = response) => {
	// get all the users 
	const users = await User.find();

	// return the users 
	res.status(200).json(users);
};

const getUsersPaginated = async (req, res = response) => {

	// get the query params
	const { limit = 5, offset = 0 } = req.query;

	// define de status of the users to get
	const query = { status: true }

	// get the count and te users
	const [ total, users ] = await Promise.all([
		User.countDocuments(query),
		User.find(query)
			.skip(offset)
			.limit(limit)
	])

	// return the total and users 
	res.json({
		total,
		users
	});
}

const getOneUser = (req = request, res = response) => {
    const params = req.params;
	res.status(200).json({
		msg: "get one API - controller",
        params
	});
};

const createUser = async (req = request, res = response) => {
	// get the params to create an user 
	const { name, email, password, role } = new User( req.body );

	// fill the model
	const user = new User({ name, email, password, role });

	// crypt the password 
	const salt = bcrypt.genSaltSync();
	user.password = bcrypt.hashSync( user.password, salt);
		
	// store in database 
	await user.save();

	// return response
	res.json(user);
};

const updateUser = async (req, res = response) => {
	const { id } = req.params;
	const { _id, password, google, correo, ...user } = req.body;

	if (password) {
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync( password, salt);
	}

	const updatedUser = await User.findByIdAndUpdate(id, user);

	res.status(201).json(updatedUser)
};

const deleteUser = async (req = request, res = response) => {
	const { id } = req.params;

	// to definitively remove the record in the db 
	// const definitive = await User.findByIdAndDelete(id);

	// to update the status ( softdelete )
	const userUpdated = await User.findByIdAndUpdate( id, { status: false} );

	res.json({ 
		userUpdated,
		userAuth: req.userAuthInfo
	});
};

module.exports = {
	getUsers,
	getUsersPaginated,
	getOneUser,
	createUser,
	updateUser,
	deleteUser,
};
