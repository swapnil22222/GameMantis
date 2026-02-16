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

exports.getGames = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;   // games per page
        const skip = (page - 1) * limit;

        const games = await Game.find()
            .skip(skip)
            .limit(limit);

        const total = await Game.countDocuments();

        res.json({
            games,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.searchGames = async (req, res) => {
    try {
        const keyword = req.query.q || "";

        const games = await Game.find({
            title: { $regex: keyword, $options: "i" }
        });

        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteGame = async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id);
        res.json({ message: "Game deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);

        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        res.json(game);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
