const mongoose = require('mongoose')

const { Schema } = mongoose

const TaskSchema = new Schema({
  title: { type: String, required: true, maxlength: 60 },
  status: { type: String, enum: ['incomplete', 'in progress', 'complete'], default: 'incomplete' }
})

module.exports = mongoose.model('Task', TaskSchema)
