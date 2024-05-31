const express = require("express");
const router = express.Router();
const Form = require("../model/formModel");

// Routes
router.post("/submit", async (req, res) => {
  const formData = new Form(req.body);
  try {
    await formData.save();
    res.status(201).send("Form submitted successfully");
  } catch (error) {
    res.status(400).send("Error submitting form");
  }
});

module.exports = router;
