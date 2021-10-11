const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
/**
 * @description URL to mongodb server.
 */
const MongoURI = process.env.mongoURI

/**
 * @desc URL to spreadsheet document.
 */
const SpreadsheetURL = 'https://docs.google.com/spreadsheets/d/1F6BvjBRKMf6cVTzrb3O-4uORjnhHN0I6DC9jkuxQibo/edit#gid=1237810515'

module.exports = { MongoURI, SpreadsheetURL }
