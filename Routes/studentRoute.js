const controller = require('../Controllers/studentController');
const { authentication } = require('../Middleware/auth');

const express = require('express');
const router = express.Router();

router.get('/tasks', authentication, controller.getTasks);

router.get('/tasks/filterby', authentication, controller.getTasksFilterBy);

router.patch('/status/update/:taskId', authentication, controller.updateStatus);

module.exports = router;
