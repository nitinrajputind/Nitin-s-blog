const jwt = require('jsonwebtoken');
const errorHandler = require("./error");


const verifyToken = (req , res , next) => {
    const token = req.cookies.access_token
    if(!token){
        return next(errorHandler(401,'Unauthorized access'));
    }
    try {
        jwt.verify(token,process.env.JWT_SECRETKEY, (err, user)=>{
            if(err){
                return next(errorHandler("Unauthorized Access"));
            }
            req.user = user;
            next()
        })
    } catch (error) {
        next(error)
    }
}

module.exports = verifyToken