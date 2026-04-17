const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST - CREATE
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // HANDLE EMPTY 
    const finalMessage =
      message && message.trim() !== "" ? message : "No message provided";

    const newContact = new Contact({
      name,
      email,
      message: finalMessage,
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Saved successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      success: false,
      message: "Error saving data",
    });
  }
});

// GET - READ ALL
router.get("/", async (req, res) => {
  try {
    const data = await Contact.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

// PUT - UPDATE (EDIT FEATURE)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating data" });
  }
});

// DELETE - REMOVE DATA
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data" });
  }
});

module.exports = router;
