const express = require("express")
const app = express()
// Trust proxy so req.ip reflects client IP behind Render/Cloudflare
// app.set('trust proxy', 1)

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

const devOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000"
]

// Configure CORS dynamically: allow dev origins locally, ALLOWED_ORIGINS in production
const allowedOriginsFromEnv = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(o => o.trim())
  .filter(Boolean)

const allowedOrigins = process.env.NODE_ENV === "production"
  ? allowedOriginsFromEnv
  : devOrigins

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.options("*", cors({ origin: allowedOrigins, credentials: true }))

app.use(express.json())

const notesRoutes = require("./routes/notesRoutes.js")

app.use((req,res,next)=>{
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
    next()
})
const PORT = process.env.PORT || 5001
app.use(rateLimiter)

app.use("/api/notes",notesRoutes)

// Frontend static files served separately on Vercel
// Remove this section for separate deployments


connectDB(process.env.MONGO_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started on port:",PORT)
    })
})