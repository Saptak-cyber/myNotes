const express = require("express");
const Note = require("../models/Note.js");

async function getAllNotes(req, res) {
  try {
    // Get notes only for the authenticated user
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.log("Error in getAllNotes controller", err);
    res.status(500).json({ message: "Internal Server error" });
  }
}
async function getNotesById(req, res) {
  try {
    // Find note by ID and ensure it belongs to the authenticated user
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
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
    const note = new Note({ 
      title, 
      content, 
      userId: req.user.id,
      userEmail: req.user.email 
    });
    const savedNote = await note.save();
    res.status(201).json({ savedNote });
  } catch (error) {
    console.log("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
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
    const deletedNote = await Note.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
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
