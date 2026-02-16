const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    quantity: {
        type: Number,
        default: 1
    },
    totalPrice: {
        type: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
