const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Faculty', facultySchema);