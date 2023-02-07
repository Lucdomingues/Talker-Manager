const express = require('express');
const { randomToken } = require('../util/randomToken');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newLogin = req.body;
        if (newLogin) {
            const token = randomToken(16);
            return res.status(200).json({ token });
        }
        return res.status(400).json({ message: 'necessita de um login' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;