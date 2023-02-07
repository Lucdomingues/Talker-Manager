const express = require('express');
const { readFs } = require('../util/fsUtils');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await readFs();
        if (result.length === 0) {
            return res.status(200).json([]);
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;