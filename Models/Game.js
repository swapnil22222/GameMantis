const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        
    },
    stock: {
        type: Number,
        default: 0
    }
},{

    timestamps: true

});

module.exports =
    mongoose.models.Game || mongoose.model('Game', gameSchema);
