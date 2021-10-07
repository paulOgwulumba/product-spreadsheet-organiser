const mongoose = require('mongoose')

/**
 * @desc Mongoose schema object created solely for code testing purposes.
 */
const TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  nationality: {
    type: String,
    required: true
  }
})

const TestModel = mongoose.model('Test', TestSchema)

module.exports = { TestModel }
