// models/Department.js:
const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Department', departmentSchema);
