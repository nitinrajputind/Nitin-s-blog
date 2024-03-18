const { test } = require('../controller/user.controller');

const userRoutes = require('express').Router();

userRoutes.get('/', test)

module.exports = userRoutes;