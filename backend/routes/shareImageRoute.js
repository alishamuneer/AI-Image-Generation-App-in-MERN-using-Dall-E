const {shareImage, getShareImage} = require('../controllers/shareImageController')
const express = require('express');
const router = express();

router.post('/shareImage', shareImage )
router.get('/getShareImage', getShareImage )

module.exports = router