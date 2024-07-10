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



const getPosts = async (req, res , next)=>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const sortDirection = req.query.order === "asc" ? 1 : -1;
        const posts = await POST.find({
            ...(req.query.userId && {userId : req.query.userId}),
            ...(req.query.category && {category : req.query.category}),
            ...(req.query.slug && {slug : req.query.slug}),
            ...(req.query.postId && {_Id : req.query.postId}),
            ...(req.query.searchTerm && {
                $or : [
                    {title : {$regex : req.query.searchTerm, $options : "i"}},
                    {content : {$regex : req.query.searchTerm, $options : "i"}},
                ],
            }),
        }).sort({ updatedAt : sortDirection}).skip(startIndex).limit(limit);

        const totalPosts = await POST.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )

        const lastMonthPosts = await POST.countDocuments({
            createdAt : {$gte : oneMonthAgo},
        }); 

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });

    } catch (error) {
        console.log("error :- " , error.message);
        next(error);
    }
};

const deletePost = async (req, res , next) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403, "You do not have permission to delete a post"));
    }
    try {
        await POST.findByIdAndDelete(req.params.postId);
        res.status(200).json('Post has been deleted successfully');
    } catch (error) {
        next(error);
    }
}


module.exports = { create, getPosts, deletePost};