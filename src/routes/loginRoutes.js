const express = require('express');
const {
    emailProperties,
    validateLogin,
   passwordProperties } = require('../middlewares/validateLogin');
const { randomToken } = require('../util/randomToken');

const router = express.Router();

router.post('/', validateLogin,
     emailProperties, passwordProperties, async (_req, res) => {
        const token = randomToken(16);
        return res.status(200).json({ token });
});

module.exports = router;