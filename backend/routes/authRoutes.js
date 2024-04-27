const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authControllers');
const { registerAdmin } = require('../controllers/authControllers');

const secretKey = process.env.ADMIN_SECRET_KEY;

router.post('/register-admin', (req, res) => {
  if (req.query.secret !== secretKey) {
    return res.status(403).send('Unauthorized');
  }
  registerAdmin(req, res);
});


router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
