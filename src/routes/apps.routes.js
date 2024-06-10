const { Router } = require('express');
const { createApp, deleteApp } = require('../controller/apps.controller');
const router = Router();

require('dotenv').config();

router.post('/createApp', createApp);
router.delete('/deleteApp/:id', deleteApp);

module.exports = router;