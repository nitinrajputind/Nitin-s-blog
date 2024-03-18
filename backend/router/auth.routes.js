const { signup } = require('../controller/auth.controller');

const authRoutes = require('express').Router();



authRoutes.post('/signup', signup);

module.exports = authRoutes;


