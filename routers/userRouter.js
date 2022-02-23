const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.route('/signup')
    .get(userController.signup)
    .post(userController.add)

router.route('/login')
    .get(userController.login)
    .post(userController.checkAccount)

router.route('/')
    .get(userController.getAll)
    .post(userController.add)

router.route('/:id')
    .post(userController.update)
    .delete(userController.delete)

module.exports = router;