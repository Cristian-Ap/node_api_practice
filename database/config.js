const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('database online');
    } catch (error) {
        console.log(error);
        throw new Error('error loading database = '+error)
    }
}

module.exports = {
    dbConnection
}