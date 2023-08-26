const express = require('express');
const router = express.Router();
const controllerUser = require('../controller')
const loginController = require('../controller/login/index');

router.post('/user', controllerUser.post);
router.post('/login', loginController.post);

module.exports = router;