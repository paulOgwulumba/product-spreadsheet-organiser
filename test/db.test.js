/* eslint-disable no-undef */
const mongoose = require('mongoose')

const { MongoURI } = require('../config/keys')

const { TestModel } = require('../utils/models')

describe('Test mongodb connection', () => {
  let db

  // run this block of code before running unit tests
  beforeAll(async () => {
    await mongoose.connect(`${MongoURI}/tester'`, {
      useNewUrlParser: true
    })
    db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', () => {
      console.log('Mongodb connected successfully')
    })
  })

  it('should successfully add information to database', async () => {
    const obj = {
      name: 'Caleb',
      age: 20,
      nationality: 'Cuba'
    }
    const testObj = new TestModel(obj)

    // save data to datbase
    await testObj.save((error) => {
      if (error) console.error(error)
    })

    let document
    await TestModel.findOne({ name: 'Caleb' }, (err, doc) => {
      if (err) console.error(err)
      document = doc
      expect(document.name).toMatch(obj.name)
      expect(document.age).toBe(obj.age)
      expect(document.nationality).toMatch(obj.nationality)
    }).clone()
  })

  // run this block of code after running all unit tests
  afterAll(async () => {
    // await mongoose.disconnect()
  })
})
