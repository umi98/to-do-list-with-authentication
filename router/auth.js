const express = require('express');
const router = express.Router();
const controller = require('../app/controller');
const { auth } = require('../utils/jwt');
const passport = require('../utils/passport');

router.post('/auth/login', controller.auth.login);
router.post('/auth/register', controller.auth.register);
router.get('/auth/whoami', auth, controller.auth.whoami);

module.exports = router;