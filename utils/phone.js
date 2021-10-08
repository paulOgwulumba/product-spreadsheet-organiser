/**
 * @desc This class defines the template for saving information about individual iPhone brands in the spreadsheet database.
 */
class Phone {
  /**
   * @desc Creates a new phone data instance
   * @param {} brand Brand name of phone.
   * @param {*} storageSize Storage size of phone in GB.
   * @param {*} status Status of phone. Can either be 'LOCKED' or 'UNLOCKED'.
   * @param {*} priceNew Price of New phone.
   * @param {*} priceA1 Price of Grade A1 device.
   * @param {*} priceA2 Price of Grade A2 device.
   * @param {*} priceB1 Price of Grade B1 device.
   * @param {*} priceB2 Price of Grade B2 device.
   * @param {*} priceC Price of Grade C device.
   * @param {*} priceCB Price of Grade C/B device.
   * @param {*} priceCD Price of Grade C/D device.
   */
  constructor (
    brand = null,
    storageSize = null,
    status = 'UNLOCKED',
    priceNew = null,
    priceA1 = null,
    priceA2 = null,
    priceB1 = null,
    priceB2 = null,
    priceC = null,
    priceCB = null,
    priceCD = null) {
    this.brand = brand // Phone brand name
    this.storageSize = storageSize // Phone storage size
    this.status = status
    this.price.New = priceNew
    this.price.A1 = priceA1
    this.price.A2 = priceA2
    this.price.B1 = priceB1
    this.price.B2 = priceB2
    this.price.C = priceC
    this.price['C/B'] = priceCB
    this.price['C/D'] = priceCD
  }
}

module.exports = Phone
