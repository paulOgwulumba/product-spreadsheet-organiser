const Server = require('./utils/server')

// creates new server
const app = new Server()

const port = process.env.PORT || 3000

// Starts the server
app.start(port)
