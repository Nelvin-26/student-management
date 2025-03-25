const controller = require('../Controllers/authController');

const express = require('express');
const router = express.Router();

router.post('/create-admin', controller.createAdmin);

router.post('/login-admin', controller.loginAdmin);

router.post('/login-student', controller.loginStudent);

module.exports = router;
