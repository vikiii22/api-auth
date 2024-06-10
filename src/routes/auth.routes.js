const { Router } = require('express');
const { login, register } = require('../controller/auth.controller');
const router = Router();

require('dotenv').config();

router.post('/login', login);
router.post('/createUser', register);

module.exports = router;