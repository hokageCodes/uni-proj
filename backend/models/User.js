const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  matricNumber: {
    type: String,
    required: function() { return this.role === 'student'; },
    unique: true,
    sparse: true
  },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['student', 'admin'] },
  avatar: { type: String, default: '' },  // Optional avatar field, defaults to an empty string if not provided
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
