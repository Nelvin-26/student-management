const taskModel = require('../Models/taskModel');

exports.getTasks = async (req, res) => {
  try {
    const studentId = req.user._id;

    const tasks = await taskModel.find({ assignedTo: studentId });
    if (tasks.length == 0) {
      return res.status(204).json({
        message: 'No tasks assigned.',
      });
    }

    res.status(200).json({
      status: 'success',
      msg: 'Tasks fetched successfully',
      tasks,
    });
  } catch (error) {
    console.log('error :', error);

    res.status(500).json({
      status: 'fail',
      msg: 'Server error',
    });
  }
};

exports.getTasksFilterBy = async (req, res) => {
  try {
    const studentId = req.user._id;
    const status = req.query.status;
    if (!status) {
      return res.status(404).json({
        message: `Query not found.`,
      });
    }

    const tasks = await taskModel.find({
      assignedTo: studentId,
      status: status,
    });
    if (tasks.length == 0) {
      return res.status(204).json({
        message: `No tasks found with status: ${status}.`,
      });
    }

    res.status(200).json({
      status: 'success',
      msg: 'Tasks fetched successfully',
      tasks,
    });
  } catch (error) {
    console.log('error :', error);

    res.status(500).json({
      status: 'fail',
      msg: 'Server error',
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const status = req.query.status;
    if (!status) {
      return res.status(404).json({
        message: `Query not found.`,
      });
    }

    await taskModel.findByIdAndUpdate(
      {
        _id: taskId,
      },
      { $set: { status: status } }
    );

    res.status(200).json({
      status: 'success',
      msg: 'Tasks status updated successfully',
    });
  } catch (error) {
    console.log('error :', error);

    res.status(500).json({
      status: 'fail',
      msg: 'Server error',
    });
  }
};
