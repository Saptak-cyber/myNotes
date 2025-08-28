const mongoose = require("mongoose")
const connectDB = async(MONGO_URL)=>{
    try{
        await mongoose.connect(MONGO_URL)
        console.log("Mongo DB connected successfully")
    }catch(err){
        console.log("Error connecting to Mongo DB",err)
    }
}
module.exports = {connectDB}