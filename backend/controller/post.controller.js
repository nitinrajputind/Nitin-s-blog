const POST = require("../model/post.model");
const errorHandler = require("../utils/error");

const create = async (req, res , next) => {
    console.log(req.user);
    console.log(req.body);
    console.log("user ID : " + req.user.id);
    if(!req.user.isAdmin){
        return next(errorHandler(403, "You do not have permission to create a post"));
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400, "please provide all required fields"));
    }
    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "");
    const newPost = new POST ({
        userId : req.user.id,
        slug : slug,
        ...req.body,
    })

    try {
        const savePost = await newPost.save();
        res.status(201).json(savePost); 
    } catch (error) {
       next(error); 
    }
};

module.exports = { create };