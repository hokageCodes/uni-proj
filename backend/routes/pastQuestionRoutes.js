// routes/pastQuestionRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadPastQuestion, getPastQuestions, updatePastQuestion, deletePastQuestion } = require('../controllers/pastQuestionController');
const auth = require('../middleware/auth');  // Ensure auth middleware is set to verify admin users

const upload = multer({ dest: 'uploads/' }); // Configure as per your requirement

router.post('/', auth, upload.single('file'), uploadPastQuestion);
router.get('/', auth, getPastQuestions);
router.put('/:id', auth, updatePastQuestion);
router.delete('/:id', auth, deletePastQuestion);

module.exports = router;
