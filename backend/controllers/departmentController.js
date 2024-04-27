// controllers/departmentController.js:
const Department = require('../models/Department');

// Get all departments or by faculty
exports.getDepartments = async (req, res) => {
  try {
    const departments = req.query.facultyId ? 
      await Department.find({ facultyId: req.query.facultyId }) :
      await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Add a new department
exports.addDepartment = async (req, res) => {
  try {
    const newDepartment = new Department({
      name: req.body.name,
      facultyId: req.body.facultyId
    });
    const department = await newDepartment.save();
    res.json(department);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update a department
exports.updateDepartment = async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedDepartment) {
      return res.status(404).send('Department not found');
    }
    res.json(updatedDepartment);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

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
