const express = require('express');
const router = express.Router();
const { getDepartments, addDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const auth = require('../middleware/auth');
const Department = require('../models/Department');

router.get('/', auth, getDepartments);
router.post('/', addDepartment);
router.put('/:id', auth, updateDepartment);
router.delete('/:id', auth, deleteDepartment);
router.get('/:slug', async (req, res) => {
    try {
      const department = await Department.findOne({ slug: req.params.slug }).populate('facultyId');
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
      res.json(department);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  module.exports = router;
module.exports = router;
