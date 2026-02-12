const express = require('express');
const router = express.Router();

const { addGame, getGames } = require('..controllers/gameController');
const protect = require('../middleware/authMiddleware');

router.post('/',protect,addGame);
router.get('/',getGames);

module.exports = router;