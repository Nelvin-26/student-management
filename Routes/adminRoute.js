const controller = require('../Controllers/adminController');
const { authentication, adminVerification } = require('../Middleware/auth');

const express = require('express');
const router = express.Router();

router.post(
  '/create-student',
  authentication,
  adminVerification,
  controller.createStudent
);

router.get(
  '/getall/students',
  authentication,
  adminVerification,
  controller.getAllStudents
);

router.post(
  '/assign/task',
  authentication,
  adminVerification,
  controller.assignTask
);

module.exports = router;
