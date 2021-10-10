const Phone = require('./phone')

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

    // if one device brand section has been fully covered, refresh and start afresh for the next.
    try {
      if (/iPhone/i.test(data[i + 1][0])) {
        innerRow = 0
        unpackedData.push(temp)
      } else {
        innerRow++
      }
    } catch (e) {
      unpackedData.push(temp)
    }
  }
  return unpackedData
}

/**
 * @desc Unpacks array of individual iPhone brands into an instance of the Phone class.
 * @param {} data array containing iPhone prices for different storage sizes and grades of the same phone brand.
 * @returns An array of Phone objects of the same brand.
 */
function createPhoneData (data = []) {
  const phones = []
  let brandName, status
  for (const datum of data) {
    if (/iphone/i.test(datum[0])) brandName = datum[0]
    if (/(unlocked|locked)/i.test(datum[0])) status = datum[0]
  }

  for (let i = 2; i < data.length; i++) {
    const storageSize = data[i][1]
    const priceNew = data[i][2]
    const priceA1 = data[i][3]
    const priceA2 = data[i][4]
    const priceB1 = data[i][5]
    const priceB2 = data[i][6]
    const priceC = data[i][7]
    const priceCB = data[i][8]
    const priceCD = data[i][9]
    const phone = new Phone(brandName, storageSize, status, priceNew, priceA1, priceA2, priceB1, priceB2, priceC, priceCB, priceCD)

    phones.push(phone)
  }

  return phones
}

/**
 * @desc Converts an array of Phone objects into a single object according to their brand name.
 * @param {*} data Array of Phone objects.
 * @returns object.
 */
function objectifyData (data = []) {
  const brandName = data[0].brand
  const object = {
    brand: brandName,
    phones: data
  }

  return object
}

/**
 * @desc Catalogs datasheet into final json object for Sales or Purchase as specified by how function is called.
 * @param {*} data An array containing arrays of spreadsheet cells of each iPhone brand in specified section.
 * @returns Object containing all information about specified section (buy or sell).
 */
function catalogData(data = [], request = '') {
  const catalogArray = []
  for (const datum of data) {
    // create an array of Phone objects
    const phoneData = createPhoneData(datum)
    // organise phone objects of the same brand name into a single Brand object
    const catalog = objectifyData(phoneData)
    // put all Brand objects into a single array
    catalogArray.push(catalog)
  }

  // Specify request (either BUY or SELL)
  const finalCatalog = {
    request: request,
    information: catalogArray
  }

  // return final catalog
  return finalCatalog
}

module.exports = { unpackData, createPhoneData, objectifyData, catalogData }
