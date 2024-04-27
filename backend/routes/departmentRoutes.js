// routes/departmentRoutes.js:
const express = require('express');
const router = express.Router();
const { getDepartments, addDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const auth = require('../middleware/auth');

router.get('/', auth, getDepartments);
router.post('/', auth, addDepartment);
router.put('/:id', auth, updateDepartment);
router.delete('/:id', auth, deleteDepartment);

module.exports = router;
