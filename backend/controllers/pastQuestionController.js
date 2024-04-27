// controllers/pastQuestionController.js

const PastQuestion = require('../models/PastQuestion');

// CREATE: Upload a new past question
exports.uploadPastQuestion = async (req, res) => {
  try {
    const { title, facultyId, departmentId, level, year, semester } = req.body;
    const file = req.file; // Assuming file is uploaded via 'multer'

    const newQuestion = new PastQuestion({
      title,
      facultyId,
      departmentId,
      level,
      documentURL: file.path, // Make sure your file storage logic is set correctly
      year,
      semester
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Upload Past Question Error:', error);
    res.status(500).send('Error uploading past question');
  }
};

// READ: Fetch all past questions (with optional filters)
exports.getPastQuestions = async (req, res) => {
  try {
    const questions = await PastQuestion.find({});
    res.json(questions);
  } catch (error) {
    console.error('Error fetching past questions:', error);
    res.status(500).send('Error fetching past questions');
  }
};

// UPDATE: Update a past question
exports.updatePastQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, facultyId, departmentId, level, year, semester } = req.body;

    const updatedQuestion = await PastQuestion.findByIdAndUpdate(id, {
      title,
      facultyId,
      departmentId,
      level,
      year,
      semester,
      updatedAt: Date.now()
    }, { new: true });

    if (!updatedQuestion) {
      return res.status(404).send('Past question not found');
    }
    res.json(updatedQuestion);
  } catch (error) {
    console.error('Update Past Question Error:', error);
    res.status(500).send('Error updating past question');
  }
};

// DELETE: Delete a past question
exports.deletePastQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await PastQuestion.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).send('Past question not found');
    }
    res.send('Past question deleted successfully');
  } catch (error) {
    console.error('Delete Past Question Error:', error);
    res.status(500).send('Error deleting past question');
  }
};
