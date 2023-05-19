const { response, request } = require("express");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authUser = async (req = request, res = response) => {
    const { email, password } = req.body;

    // check email 
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({
        msg: "user not found"
    })

    // check status
    if (!user.status) return res.status(400).json({
        msg: "user status invalid"
    })

    // check password
    const passValidation = bcrypt.compareSync( password, user.password);
    if (!passValidation) return res.status(400).json({
        msg: "password invalid"
    })

    // generate token
    const token = jwt.sign({
        id: user.id,
        role: user.role
      }, process.env.TOKEN_KEY , { expiresIn: '1h' });

    // return data
    res.json({
        user,
        token
    })
}

module.exports = {
    authUser
}