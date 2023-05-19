const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String
    }, 
    price: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
})

module.exports = model( 'Product', ProductSchema );