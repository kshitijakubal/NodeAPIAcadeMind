const express = require('express');
const Router = express.Router();
const userController = require('../controllers/users.controller');
const checkAuth = require('../middleware/checkAuth')

Router.post('/signup', userController.user_signup);
Router.post('/login', userController.user_login);
Router.delete('/:userId',checkAuth, userController.delete_user)

module.exports = Router;