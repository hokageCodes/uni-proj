const express = require('express');
const router = express.Router();
const { getStudents } = require('../controllers/studentController');
const auth = require('../middleware/auth');  // Reusing existing auth middleware

router.get('/', auth, getStudents); // Only admins can access this route

module.exports = router;
