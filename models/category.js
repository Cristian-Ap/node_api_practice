const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Category name is required']
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'Category status is required'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

module.exports = model( 'Category', CategorySchema );