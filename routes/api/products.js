const express = require('express')

const mongoose = require('mongoose')

const { MongoURI } = require('../../config/keys')

const products = express.Router()

const extractPriceList = require('../../utils/extractPriceList')

const { RequestSchema } = require('../../utils/models')

// initialise mongoose models
const buyRequestModel = mongoose.model('buy-request', RequestSchema)
const sellRequestModel = mongoose.model('sell-request', RequestSchema)

// connect mongoose to mongodb server
mongoose.connect(MongoURI, { useNewUrlParser: true })

/**
 * @desc This endpoint triggers the extraction of price information from the spreadsheet document and storage in the database
 */
products.get('/extract', async (req, res) => {
  const priceInformation = await extractPriceList()
  const buyPriceInformation = priceInformation[0]
  const sellPriceInformation = priceInformation[1]

  try {
    // delete old information in database
    await sellRequestModel.deleteMany({})
      .then(() => console.log('sell request database emptied successfully'))
      .catch((error) => console.log('Error emptying Buy Request db: ' + error))
    await buyRequestModel.deleteMany({})
      .then(() => console.log('buy request database emptied successfully'))
      .catch((error) => console.log('Error emptying Buy Request db: ' + error))

    // add new information to database
    await sellRequestModel.create(sellPriceInformation, (error, doc) => {
      if (error) {
        console.error(error)
      } else {
        console.log('Sell Request price information saved to database successfully')
      }
    })

    await buyRequestModel.create(buyPriceInformation, async (error, doc) => {
      if (error) {
        console.error(error)
      } else {
        console.log('Buy Request price information saved to database successfully')
      }
    })

    res.status(200).send({ status: 'successful' })
  } catch (e) {
    console.error(e)
    res.status(500).send('<h1 style="color: tomato; margin-top: 5rem">Internal Server Error!</h1>')
  }
})

/**
 * @desc This endpoint sends price information to the clientside depending on the query accompanying the request
 */
products.get('/', async (req, res) => {
  let object
  try {
    if (!req.query.request) {
      object = await getFromDatabase()
    } else if (/buy/i.test(req.query.request)) {
      const objectArray = await getFromDatabase('buy')
      object = objectArray[0]
    } else if (/sell/i.test(req.query.request)) {
      const objectArray = await getFromDatabase('sell')
      object = objectArray[0]
    } else {
      object = await getFromDatabase()
    }

    res.status(200).json(object)
  } catch (e) {
    console.error(e)
    res.status(500).send('<h1 style="color: tomato; margin-top: 5rem">Internal Server Error!</h1>')
  }
})

/**
 * @desc Gets information from the database
 * @param {*} request specifies the particular request section to get from database. Can be 'buy', 'sell' or 'all'
 * @returns array containing information gotten from database.
 */
async function getFromDatabase (request = 'ALL') {
  const data = []

  // buy request
  if (/buy/i.test(request)) {
    await buyRequestModel.findOne({ request: 'BUY' }, (error, doc) => {
      if (error) {
        throw error
      }
      console.log('Buy Request price information extracted from database successfully')
      data.push(doc)
    }).clone()
  } else if (/sell/i.test(request)) { // sell request
    await sellRequestModel.findOne({ request: 'SELL' }, (error, doc) => {
      if (error) {
        throw error
      }
      console.log('Sell Request price information extracted from database successfully')
      data.push(doc)
    }).clone()
  } else { // get both sell and buy request
    await sellRequestModel.findOne({ request: 'SELL' })
      .then(async (doc) => {
        console.log('Sell Request price information extracted from database successfully')
        data.push(doc)
        await buyRequestModel.findOne({ request: 'BUY' })
          .then(docs => {
            console.log('Buy Request price information extracted from database successfully')
            data.push(docs)
          })
          .catch(err => {
            console.error(err)
            throw err
          })
      })
      .catch(err => {
        console.error(err)
        throw err
      })
  }

  return data
}

module.exports = products
