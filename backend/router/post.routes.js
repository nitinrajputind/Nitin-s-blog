const { create } = require('../controller/post.controller');
const verifyToken = require('../utils/verifyUser');

const postRoutes = require('express').Router();


postRoutes.post('/create', verifyToken, create);

module.exports = postRoutes;