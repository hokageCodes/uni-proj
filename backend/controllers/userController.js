// controllers/userController.js:

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).send('Server error');
    }
  };
  
  // Update user profile
  exports.updateUserProfile = async (req, res) => {
    try {
      const { name, email } = req.body;
      const user = await User.findByIdAndUpdate(req.user.id, { $set: { name, email } }, { new: true }).select('-password');
      res.json(user);
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).send('Server error');
    }
  };
  