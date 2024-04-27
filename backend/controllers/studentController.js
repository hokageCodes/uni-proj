const User = require('../models/User');

exports.getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { [sortBy]: order },
      select: '_id fullName email matricNumber createdAt'
    };

    // Filter to only include students
    const result = await User.paginate({ role: 'student' }, options);
    res.json(result);
  } catch (error) {
    console.error('Fetch Students Error:', error);
    res.status(500).send('Server error while retrieving students');
  }
};
