const mongoose = require('mongoose')
const Phone = require('./phone')

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

/**
 * @desc Mongoose Schema object for organising price information.
 */
const RequestSchema = new mongoose.Schema({
  request: {
    type: String,
    required: true
  },
  information: [
    {
      brand: {
        type: String,
        required: true
      },
      phones: [
        {
          brand: {
            type: String,
            required: true
          },
          storageSize: {
            type: String,
            required: true
          },
          status: {
            type: String,
            required: true
          },
          price: [
            {
              New: {
                type: Number,
                required: false
              },
              A1: {
                type: Number,
                required: false
              },
              A2: {
                type: Number,
                required: false
              },
              B1: {
                type: Number,
                required: false
              },
              B2: {
                type: Number,
                required: false
              },
              C: {
                type: Number,
                required: false
              },
              'C/B': {
                type: Number,
                required: false
              },
              'C/D': {
                type: Number,
                required: false
              }
            }
          ]
        }
      ]
    }
  ]
})

module.exports = { TestModel, RequestSchema }
