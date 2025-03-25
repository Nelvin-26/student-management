const userModel = require('../Models/userModel');
const taskModel = require('../Models/taskModel');

const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

exports.createStudent = async (req, res) => {
  try {
    const { name, department, email, password } = req.body;

    const user = await userModel.findOne({ email: email }).select('-password');
    if (user) {
      return res.status(409).json({
        message: 'Email ID already exists.',
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await userModel.create({
      name,
      department,
      email,
      password: hashedPass,
      role: 'STUDENT',
    });

    res.status(201).json({
      status: 'success',
      msg: 'Student created successfully',
    });
  } catch (error) {
    console.log('error :', error);

    res.status(500).json({
      status: 'fail',
      msg: 'Server error',
    });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await userModel.find({ role: 'STUDENT' });
    if (students.length == 0) {
      return res.status(404).json({
        message: 'No students found',
      });
    }

    res.status(200).json({
      status: 'success',
      msg: 'Tasks fetched successfully',
      students,
    });
  } catch (error) {
    console.log('error :', error);

    res.status(500).json({
      status: 'fail',
      msg: 'Server error',
    });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;

    const student = await userModel.find({ _id: assignedTo });
    if (!student) {
      return res.status(404).json({
        message: 'Student not found.',
      });
    }

    const date = new Date(dueDate);

    await taskModel.create({
      title,
      description,
      assignedTo,
      dueDate: date,
    });

    res.status(200).json({
      status: 'success',
      msg: 'Task assigned successfully',
    });
  } catch (error) {
    console.log('error :', error);

    res.status(500).json({
      status: 'fail',
      msg: 'Server error',
    });
  }
};
