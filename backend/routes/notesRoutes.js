const express = require("express")
const router = express.Router()
const {getAllNotes,getNotesById,createNotes,updateNotes,deleteNotes} = require("../controllers/notesController.js")
const { authenticateUser } = require("../middleware/auth.js")

// Apply authentication middleware to all routes
router.use(authenticateUser)

router.get("/",getAllNotes)
router.get("/:id",getNotesById)
router.post("/",createNotes)
router.put("/:id",updateNotes)
router.delete("/:id",deleteNotes)
module.exports = router
