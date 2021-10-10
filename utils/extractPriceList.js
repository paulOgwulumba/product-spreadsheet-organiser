const excelFileReader = require('read-excel-file/node')

const { unpackData, catalogData } = require('./data')

/**
 * @desc Extracts iPhone price information from spreadsheet document and organises it into JSON objects.
 * @param {*} filePath file path of spreadsheet document to be read.
 * @return array of objects containing price information for Buy and Sell request.
 */
async function extractPriceList (filePath = './file/Price List.xlsx') {
  const finalCatalog = []
  await excelFileReader(filePath, { sheet: 'IPHONES' }).then(rows => {
    const purchaseList = unpackData(rows, 'BUY')
    const purchaseCatalog = catalogData(purchaseList, 'BUY')

    const saleList = unpackData(rows, 'SELL')
    const saleCatalog = catalogData(saleList, 'SELL')

    finalCatalog.push(purchaseCatalog, saleCatalog)
  })

  return finalCatalog
}

module.exports = extractPriceList
