const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

exports.authentication = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    const decode = jwt.verify(token, process.env.JWTKEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log('error :', error);

    res.status(500).json({
      status: 'fail',
      msg: 'Invalid token',
    });
  }
};

exports.adminVerification = async (req, res, next) => {
  try {
    const userDetails = req.user;
    if (userDetails.role !== 'ADMIN') {
      return res.status(401).json({
        message: 'Access denied.',
      });
    }

    next();
  } catch (error) {
    console.log('error :', error);

    res.status(500).json({
      status: 'fail',
      msg: 'Server error',
    });
  }
};
