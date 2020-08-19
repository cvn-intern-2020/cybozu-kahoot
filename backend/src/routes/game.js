const express = require('express');

const { Game } = require('../game/model');

const router = express.Router();

router.route('/:roomId').get((req, res) => {
    const { roomId } = req.params;

    const isExist = Game.isExist(roomId);
    if (!isExist) return res.status(404).json({ error: 'Room not found.' });
    const game = Game.findGameById(roomId);
    if (game.currentQuestion && game.currentQuestion.question)
        return res.status(404).json({ error: 'The game has started.' });
    return res.status(200).json({ success: 'Room existed.' });
});

module.exports = router;
