// routes/facultyRoutes.js:
const express = require('express');
const router = express.Router();
const { getFaculties, addFaculty, updateFaculty, deleteFaculty } = require('../controllers/facultyController');
const auth = require('../middleware/auth');  // Ensure you secure all admin routes with auth middleware

router.get('/', auth, getFaculties);
router.post('/', auth, addFaculty);
router.put('/:id', auth, updateFaculty);
router.delete('/:id', auth, deleteFaculty);

module.exports = router;
