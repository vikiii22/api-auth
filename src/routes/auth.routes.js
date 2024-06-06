const { Router } = require('express');
const { login } = require('../controller/auth.controller');
const router = Router();

require('dotenv').config();

router.post('/login', login);

module.exports = router;