// models/PastQuestion.js

const mongoose = require('mongoose');

const pastQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  level: { type: Number, required: true },
  documentURL: { type: String, required: true },
  year: { type: Number, required: true },
  semester: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PastQuestion', pastQuestionSchema);
