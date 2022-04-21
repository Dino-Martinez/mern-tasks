const mongoose = require('mongoose')

const { Schema } = mongoose

const TaskSchema = new Schema({
  createdAt: { type: Date },
  title: { type: String, required: true, maxlength: 60 },
  status: { type: String, enum: ['incomplete', 'in progress', 'complete'], default: 'incomplete' },
  dueDate: { type: Date, default: null },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Task', TaskSchema)
