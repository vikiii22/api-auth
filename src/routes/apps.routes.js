const { Router } = require('express');
const { createApp } = require('../controller/apps.controller');
const router = Router();

require('dotenv').config();

router.post('/createApp', createApp);

module.exports = router;