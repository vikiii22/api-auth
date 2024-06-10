const express = require('express');

const router = express.Router();
const authRouter = require('./auth.routes');
const appsRouter = require('./apps.routes');

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

router.use('/auth', authRouter);
router.use('/apps', appsRouter);

module.exports = router;