const express = require('express');
const router = express.Router();
const { registerAdmin, loginUser } = require('../controllers/authController');

// router.post('/register-admin', registerAdmin); we are making this route proctive beause it not for public use  
router.post('/login', loginUser);

module.exports = router;