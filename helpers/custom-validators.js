const { Category, Product } = require("../models");
const Role = require("../models/role");
const User = require("../models/user");

const roleIsSupported = async (role = '') => {
    const roleVal = await Role.findOne({ role });
    if (!roleVal) throw new Error('Role not supported');
}

const emailAlreadyUsed = async (email) => {
    const emailVal = await User.findOne({ email });
    if (emailVal) throw new Error('Email already in use');
}

const userExist = async (id) => {
    const userVal = await User.findById(id);
    if (!userVal) throw new Error(`User with id = ${id} not found`);
}

const categoryExist = async (id) => {
    const catVal = await Category.findById(id);
    if (!catVal) throw new Error(`Category with id = ${id} not found`);
}

const productExist = async (id) => {
    const prodVal = await Product.findById(id);
    if (!prodVal) throw new Error(`Productwith id = ${id} not found`);
}
module.exports = {
    roleIsSupported,
    emailAlreadyUsed,
    userExist,
    categoryExist,
    productExist
}