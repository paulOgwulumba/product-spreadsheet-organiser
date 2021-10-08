/* eslint-disable no-undef */
const mongoose = require('mongoose')

const { MongoURI } = require('../config/keys')

const excelFileReader = require('read-excel-file/node')

const { TestModel } = require('../utils/models')

describe('Test mongodb connection', () => {
  // run this block of code before running unit tests
  beforeAll(async () => {
    // connect mongoose to mongodb server
    await mongoose.connect(`${MongoURI}/test'`, {
      useNewUrlParser: true
    })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', () => {
      console.log('Mongodb connected successfully')
    })

    // empty database
    await TestModel.deleteMany({})
  })

  it('should add information to database', async () => {
    // object to be added to database
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

  it('should delete information from the database', async () => {
    // object to be added to database and then deleted
    const obj = {
      name: 'Titus',
      age: 21,
      nationality: 'Cubana'
    }
    const testObj = new TestModel(obj)

    // save data to datbase
    await testObj.save((error) => {
      if (error) console.error(error)
    })

    // delete data from database
    await TestModel.deleteOne({ name: 'Titus' })

    // check for deleted data in database
    await TestModel.findOne(obj, (err, doc) => {
      if (err) console.error(err)
      expect(doc).toBeNull()
    }).clone()
  })

  // run this block of code after running all unit tests
  afterAll(async () => {
    await mongoose.disconnect()
  })
})

describe('Read data from spreadsheet file', () => {
  it('should read data from local spreadsheet file', async () => {
    await excelFileReader('./file/Test.xlsx').then((rows) => {
      console.table(rows)
      expect(rows).not.toBeNull()
    })
  })

  it('should read data from remote spreadsheet file', async () => {
    await excelFileReader(require('../config/keys').SpreadsheetURL).then((rows) => {
      console.table(rows)
      expect(rows).not.toBeNull()
    })
  })
})
