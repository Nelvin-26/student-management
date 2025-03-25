const userModel = require('../Models/userModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email: email }).select('-password');
    if (user) {
      return res.status(409).json({
        message: 'Email ID already exists.',
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await userModel.create({
      name,
      email,
      password: hashedPass,
      role: 'ADMIN',
    });

    res.status(201).json({
      status: 'success',
      msg: 'Admin created successfully',
    });
  } catch (error) {
    console.log('error :', error);

    res.status(500).json({
      status: 'fail',
      msg: 'Server error',
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email, role: 'ADMIN' });
    if (!user) {
      return res.status(404).json({
        msg: 'Admin not found.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWTKEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      status: 'success',
      msg: 'Login successfull',
      data: { token, userId: user._id },
    });
  } catch (error) {
    console.log('error :', error);

    res.status(500).json({
      status: 'fail',
      msg: 'Server error',
    });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email, role: 'STUDENT' });
    if (!user) {
      return res.status(404).json({
        msg: 'Student not found.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWTKEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      status: 'success',
      msg: 'Login successfull',
      data: { token, userId: user._id },
    });
  } catch (error) {
    console.log('error :', error);

    res.status(500).json({
      status: 'fail',
      msg: 'Server error',
    });
  }
};
