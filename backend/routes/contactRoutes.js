const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");


// POST - CREATE CONTACT
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const finalMessage =
      message && message.trim() !== ""
        ? message
        : "No message provided";

    const newContact = new Contact({
      name,
      email,
      message: finalMessage,
    });

    await newContact.save();

    return res.status(201).json({
      success: true,
      message: "Saved successfully",
      data: newContact,
    });

  } catch (error) {
    console.error("POST error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while saving data",
    });
  }
});


// GET - READ ALL
router.get("/", async (req, res) => {
  try {
    const data = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json(data);

  } catch (error) {
    console.error("GET error:", error);

    return res.status(500).json({
      message: "Error fetching data",
    });
  }
});


// PUT - UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   // FIX (important)
    );

    return res.status(200).json(updated);

  } catch (error) {
    console.error("PUT error:", error);

    return res.status(500).json({
      message: "Error updating data",
    });
  }
});


// DELETE - REMOVE
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Deleted successfully",
    });

  } catch (error) {
    console.error("DELETE error:", error);

    return res.status(500).json({
      message: "Error deleting data",
    });
  }
});

module.exports = router;