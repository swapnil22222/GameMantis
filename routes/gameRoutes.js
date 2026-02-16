const admin = require('../middleware/adminMiddleware');
const express = require('express');
const router = express.Router();

const { addGame, getGames, searchGames , deleteGame , getGameById} = require('../controllers/gameController');
const protect = require('../middleware/authMiddleware');


router.post('/', protect, admin, addGame);
router.get('/', getGames);
router.get('/search', searchGames);
router.get('/:id', getGameById);
router.delete('/:id', protect, admin, deleteGame);



module.exports = router;