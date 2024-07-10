const { create, getPosts } = require('../controller/post.controller');
const verifyToken = require('../utils/verifyUser');

const postRoutes = require('express').Router();


postRoutes.post('/create', verifyToken, create);
postRoutes.get('/getposts', getPosts);

module.exports = postRoutes;