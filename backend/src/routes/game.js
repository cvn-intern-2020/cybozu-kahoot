const express = require('express');

const { Game } = require('../game/model');

const router = express.Router();

router.route('/:roomId').get((req, res) => {
    const { roomId } = req.params;
    const isExist = Game.isExist(roomId);
    if (isExist) return res.status(200).json({ success: 'Room existed.' });
    return res.status(404).json({ error: 'Room not found.' });
});

module.exports = router;
