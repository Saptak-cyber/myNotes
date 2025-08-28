const ratelimit = require("../config/upstash.js");
const rateLimiter = async(req,res,next)=>{
    try{
        const {success} = await ratelimit.limit("my-limit-key")
        if(!success){
            return res.status(429).json({
                message:"Too many requests, please try again later"
            })
        }
        next()

    }catch(err){
        console.log("Rate limit error",err)
        next(err)
    }
}
module.exports = rateLimiter