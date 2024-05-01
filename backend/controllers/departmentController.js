const Department = require('../models/Department');
const { body, validationResult } = require('express-validator');

// Get all departments or by faculty
exports.getDepartments = async (req, res) => {
  try {
    const departments = req.query.facultyId ? 
      await Department.find({ facultyId: req.query.facultyId }).populate('facultyId') :
      await Department.find().populate('facultyId');
    if (departments.length === 0) {
      res.status(200).json({ message: 'No departments found', departments: [] });
    } else {
      res.json(departments);
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};


exports.addDepartment = [
  body('departmentCode').trim().isLength({ min: 1 }).withMessage('Department code must not be empty.'),
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Department name must not be empty.'),
  body('facultyId').trim().isMongoId().withMessage('Invalid Faculty ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { departmentCode, name, facultyId } = req.body;
    try {
      const newDepartment = new Department({ departmentCode, name, facultyId });
      await newDepartment.save();
      res.json(newDepartment);
    } catch (error) {
      console.error("Error when adding department:", error);
      res.status(500).send('Server error: ' + error.message);
    }
  }
];



// Update a department with validation
exports.updateDepartment = [
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Department name must not be empty.'),
  body('facultyId').trim().isMongoId().withMessage('Invalid Faculty ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const department = await Department.findByIdAndUpdate(
        req.params.id, 
        { $set: req.body }, 
        { new: true }
      );
      if (!department) {
        return res.status(404).send('Department not found');
      }
      res.json(department);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
];

// Delete a department
exports.deleteDepartment = async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).send('Department not found');
    }
    res.send('Department deleted successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
};
