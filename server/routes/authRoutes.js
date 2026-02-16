const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerAdmin } = require('../controllers/registerController');

router.post('/login', authController.login);
router.post('/register-admin', registerAdmin);

module.exports = router;
