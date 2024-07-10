const { create, getPosts, updatePost } = require('../controller/post.controller');
const verifyToken = require('../utils/verifyUser');

const postRoutes = require('express').Router();


postRoutes.post('/create', verifyToken, create);
postRoutes.get('/getposts', getPosts);
postRoutes.put('/updatepost/:postId/:userId', verifyToken, updatePost);

module.exports = postRoutes;