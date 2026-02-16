const Order = require('../models/Order');
const Game = require('../Models/Game');

exports.createOrder = async (req, res) => {
    try {
        const { gameId, quantity } = req.body;

        const game = await Game.findById(gameId);

        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        if (game.stock < quantity) {
            return res.status(400).json({ message: "Not enough stock" });
        }

        const totalPrice = game.price * quantity;

        const order = await Order.create({
            user: req.user._id,
            game: gameId,
            quantity,
            totalPrice
        });

        game.stock -= quantity;
        await game.save();

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};


    exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('game');

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };
