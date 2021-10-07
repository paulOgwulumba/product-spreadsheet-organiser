/**
 * @desc A class whose instance is an indepedent express server object.
 */
class Server {
  constructor () {
    const express = require('express')

    this.app = express() // Create an instance of the express app

    // Import routes
    const products = require('../routes/api/products')

    // Use routes
    this.app.use('/api/products', products)

    // A call to base url of api returns error message
    this.app.get('/', (request, response) => {
      response.send('<h1 style="color: tomato; text-align: center; margin: 6rem">Bad Gateway</h1>')
    })
  }

  /**
   * @desc Starts the express http server
   * @param {*} port Specifies the port server will be listening on. Default value is 5000.
   * @returns http.httpServer object. This object is required if server is to be stopped during runtime.
   */
  async start (port = '5000') {
    this.httpServer = await this.app.listen(port, () => {
      console.log(`Listening on port: ${port}`)
    })

    return this.httpServer
  }

  async stop () {
    await this.httpServer.close((error) => {
      if (error) console.error(error)
    })
  }
}

module.exports = Server
