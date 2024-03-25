const { test, updateUser } = require('../controller/user.controller');
const verifyToken = require('../utils/verifyUser');

const userRoutes = require('express').Router();

userRoutes.get('/', test);
userRoutes.put('/update/:userId',verifyToken,updateUser);

module.exports = userRoutes;