const express = require("express")
const app = express()
const rateLimiter = require("./middleware/rateLimiter.js")
require('dotenv').config()
const cors = require("cors")

const { connectDB } = require("./config/db.js")
app.use(cors({
    origin: "http://localhost:5173",
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


// connectDB(process.env.MONGO_URL)
// app.listen(PORT,()=>{
//     console.log("Server started on port:",PORT)
// })
connectDB(process.env.MONGO_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started on port:",PORT)
    })
})