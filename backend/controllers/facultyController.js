// controllers/facultyController.js:
const Faculty = require('../models/Faculty');
const { body, validationResult } = require('express-validator');

// Get all faculties
exports.getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Add a new faculty with validation
exports.addFaculty = [
  body('facultyCode').trim().isLength({ min: 1 }).withMessage('Faculty code must not be empty.'),
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Name must not be empty.'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newFaculty = new Faculty({
      facultyCode: req.body.facultyCode,
      name: req.body.name
    });

    try {
      await newFaculty.save();
      res.json(newFaculty);
    } catch (error) {
      res.status(500).send('Server error: ' + error.message);
    }
  }
];

// Update a faculty with validation
exports.updateFaculty = [
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Name must not be empty.'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedFaculty = await Faculty.findOneAndUpdate(
        { facultyCode: req.params.facultyCode },
        { $set: req.body },
        { new: true }
      );
      if (!updatedFaculty) {
        return res.status(404).send('Faculty not found');
      }
      res.json(updatedFaculty);
    } catch (error) {
      res.status(500).send('Server error: ' + error.message);
    }
  }
];


// Delete a faculty
exports.deleteFaculty = async (req, res) => {
  try {
    const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!deletedFaculty) {
      return res.status(404).send('Faculty not found');
    }
    res.send('Faculty deleted successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
};
