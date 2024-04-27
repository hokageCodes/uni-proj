require('dotenv').config(); // Make sure this line is at the top
const facultyRoutes = require('./routes/facultyRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const pastQuestionRoutes = require('./routes/pastQuestionRoutes');
const cors = require('cors');


const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();  // Establish MongoDB connection

// app.get('/', (req, res) => {
//   res.send('Backend Connected!');
// });

app.use('/api/auth', authRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/past-questions', pastQuestionRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
