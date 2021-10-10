const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '..', '.env') })
/**
 * @description URL to mongodb server.
 */
const MongoURI = 'mongoURI=mongodb+srv://paul044:.Millicent99@react-course.lorip.mongodb.net/iPhone?retryWrites=true&w=majority'

/**
 * @desc URL to spreadsheet document.
 */
const SpreadsheetURL = 'https://docs.google.com/spreadsheets/d/1F6BvjBRKMf6cVTzrb3O-4uORjnhHN0I6DC9jkuxQibo/edit#gid=1237810515'

module.exports = { MongoURI, SpreadsheetURL }
