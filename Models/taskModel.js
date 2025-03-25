const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Overdue'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const taskSchema = mongoose.model('tasks', schema);

module.exports = taskSchema;
