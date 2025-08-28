const express = require("express")
const app = express()

const rateLimiter = require("./middleware/rateLimiter.js")
require('dotenv').config()
const cors = require("cors")
const path = require('path')
// const __dirname = path.resolve()

const { connectDB } = require("./config/db.js")

// if(process.env.NODE_ENV !== "production"){   
//     app.use(cors({
//         origin: "http://localhost:5173",
//     }))
// }
// Configure CORS for both development and production
const allowedOrigins = [
    "http://localhost:5173", // Local development
    "http://localhost:3000", // Alternative local port
    "https://my-notes-omega-five.vercel.app" // Remove trailing slash for proper CORS
];

if(process.env.NODE_ENV === "production"){
    // In production, add your Vercel domain to allowed origins
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.use(express.json())

const notesRoutes = require("./routes/notesRoutes.js")

app.use((req,res,next)=>{
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
    next()
})
const PORT = process.env.PORT || 5001
app.use(rateLimiter)

app.use("/api/notes",notesRoutes)

// Add a simple root route for health checks
app.get("/", (req, res) => {
    res.json({ 
        message: "Notes API Server is running!", 
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

// Add a health check endpoint
app.get("/health", (req, res) => {
    res.json({ 
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});


// connectDB(process.env.MONGO_URL)
// app.listen(PORT,()=>{
//     console.log("Server started on port:",PORT)
// })
connectDB(process.env.MONGO_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started on port:",PORT)
    })
})