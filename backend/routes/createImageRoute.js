const { createImage } = require('../controllers/createImageController')
const express = require('express');
const router = express();

router.post('/createImage', createImage)

module.exports = router