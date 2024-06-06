const express = require('express');

const router = express.Router();
const authRouter = require('./auth.routes');

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

router.use('/auth', authRouter);

module.exports = router;