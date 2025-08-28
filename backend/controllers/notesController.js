const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note.js");

async function getAllNotes(req, res) {
  try {
    console.log("🔍 Fetching all notes...");
    console.log("📊 MongoDB connection state:", mongoose.connection.readyState);
    
    const notes = await Note.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${notes.length} notes`);
    
    res.status(200).json(notes);
  } catch (err) {
    console.error("❌ Error in getAllNotes controller:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ 
      message: "Internal Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
}
async function getNotesById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in getNotesById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    // res.status(201).json({message:"Note created successfully"})
    res.status(201).json({ savedNote });
  } catch (error) {
    console.log("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function deleteNotes(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteNode controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  getAllNotes,
  getNotesById,
  createNotes,
  updateNotes,
  deleteNotes,
};
