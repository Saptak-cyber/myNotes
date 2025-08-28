const mongoose = require("mongoose")

const connectDB = async(MONGO_URL)=>{
    try{
        if (!MONGO_URL) {
            throw new Error("MONGO_URL environment variable is not set");
        }
        
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("✅ MongoDB connected successfully")
        console.log("📍 Database:", mongoose.connection.name)
    }catch(err){
        console.error("❌ Error connecting to MongoDB:", err.message)
        console.error("Full error:", err)
        process.exit(1) // Exit process if DB connection fails
    }
}

module.exports = {connectDB}