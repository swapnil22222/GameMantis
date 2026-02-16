const Cart = require('../Models/Cart');

exports.addToCart = async (req, res) => {
    try {
        const { gameId, quantity } = req.body;

        let cart = await Cart.findOne({ user: req.user._id });

        // If cart does not exist, create it
        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: []
            });
        }

        // Check if game already exists in cart
        const itemIndex = cart.items.findIndex(
            item => item.game.toString() === gameId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ game: gameId, quantity });
        }

        await cart.save();

        res.json({ message: "Item added to cart", cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate('items.game');

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 


exports.removeFromCart = async (req, res) => {
    try {
        const { gameId } = req.body;

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            item => item.game.toString() !== gameId
        );

        await cart.save();

        res.json({ message: "Item removed from cart", cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.checkoutCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let orders = [];

        for (let item of cart.items) {
            const game = await Game.findById(item.game);

            if (!game || game.stock < item.quantity) {
                return res.status(400).json({ message: "Stock issue for a game" });
            }

            const totalPrice = game.price * item.quantity;

            const order = await Order.create({
                user: req.user._id,
                game: item.game,
                quantity: item.quantity,
                totalPrice
            });

            game.stock -= item.quantity;
            await game.save();

            orders.push(order);
        }

        cart.items = [];
        await cart.save();

        res.json({
            message: "Checkout successful",
            orders
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};