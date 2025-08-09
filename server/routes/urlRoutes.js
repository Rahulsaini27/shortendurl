const express = require('express');
const router = express.Router();
const { shortenUrl, getAllUrls } = require('../controllers/urlController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/shorten', shortenUrl);
router.get('/urls',protect, getAllUrls);

module.exports = router;