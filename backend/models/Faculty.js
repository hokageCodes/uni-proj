const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  facultyCode: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Faculty', facultySchema);
