// controllers/facultyController.js:
const Faculty = require('../models/Faculty');

// Get all faculties
exports.getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Add a new faculty
exports.addFaculty = async (req, res) => {
  try {
    const newFaculty = new Faculty({
      name: req.body.name
    });
    const faculty = await newFaculty.save();
    res.json(faculty);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update a faculty
exports.updateFaculty = async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedFaculty) {
      return res.status(404).send('Faculty not found');
    }
    res.json(updatedFaculty);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

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
