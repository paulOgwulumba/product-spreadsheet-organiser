const excelFileReader = require('read-excel-file/node')

const Phone = require('./phone')

/**
 * @desc Extracts iPhone price information from spreadsheet document and organises it into a Mongoose Schema.
 * @param {*} filePath file path of spreadsheet document to be read.
 * @return Mongoose Schema model object of price information.
 */
function extractPriceList (filePath = './file/Price List.xlsx') {
  excelFileReader(filePath, { sheet: 'IPHONES' }).then(rows => {
    (unpackData(rows, 'BUY'))
  })
}

/**
 * @desc This unpacks the array object gotten from the spreadsheet into separate arrays of each phone brand.
 * @param {*} data Array object to be unpacked.
 * @param {*} section Specifies which of the Request sections to be unpacked. Value can either be 'BUY' or 'SELL'. Default is 'BUY'
 * @returns An array containing arrays of spreadsheet cells of each iPhone brand in specified section.
 */
function unpackData (data = [], section = 'BUY') {
  let column = {}
  let unpackedData = []

  switch (section) {
    case 'BUY':
      column.start = 0
      column.stop = 9
      break
    case 'SELL':
      column.start = 11
      column.stop = 20
      break
    default:
      column.start = 0
      column.stop = 9
  }

  let innerRow = 0
  let temp = []

  for (let i = 2; i < 66; i++) {
    temp = innerRow === 0 ? [] : temp
    temp.push([])
    for (let j = column.start; j <= column.stop; j++) {
      temp[innerRow].push(data[i][j])
    }

    // if one device section has been fully covered, refresh and start afresh for the next.
    if (temp.length === 5) {
      innerRow = 0
      unpackedData.push(temp)
    } else {
      innerRow++
    }
  }
  return unpackedData
}

extractPriceList()

module.exports = extractPriceList
