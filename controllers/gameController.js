const Game = require('../Models/Game');

exports.addGame = async (req, res) => {
    try {
        const {title, description, price , genre , stock} = req.body;

        const game = await Game.create({
            title,
            description,
            price,
            genre,
            stock
        });

        res.status(201).json({
            message: "Game added successfully",
            game
        });

    }catch(error){
        res.status(500).json({ message: error.message});
    }
};

exports.getGames = async (req,res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
};
