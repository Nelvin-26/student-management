const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['ADMIN', 'STUDENT'],
      required: true,
    },
  },
  { timestamps: true }
);

const userSchema = mongoose.model('user', schema);

module.exports = userSchema;
