const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        default: false,
    }
},
    {timestamps: true}

);

module.exports = mongoose.model('Product', productSchema);