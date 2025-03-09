const express = require('express');

const v1ApiRoutes = require('./V1/index'); 

const router = express.Router();

router.use('/V1', v1ApiRoutes);

module.exports = router; 