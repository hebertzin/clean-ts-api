const express = require('express');
const router = express.Router();
const controllerUser = require('../controller')

router.post('/user', controllerUser.post);

module.exports = router;