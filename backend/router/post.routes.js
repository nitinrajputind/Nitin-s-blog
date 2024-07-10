const { create, getPosts, updatePost, deletePost } = require('../controller/post.controller');
const verifyToken = require('../utils/verifyUser');

const postRoutes = require('express').Router();


postRoutes.post('/create', verifyToken, create);
postRoutes.get('/getposts', getPosts);
postRoutes.put('/updatepost/:postId/:userId', verifyToken, updatePost);
postRoutes.delete('/deletepost/:postId/:userId', verifyToken, deletePost);

module.exports = postRoutes;