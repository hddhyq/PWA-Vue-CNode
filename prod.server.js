const express = require('express')
const config = require('./config/index')
const history = require('connect-history-api-fallback')

const port = 9000

const app = express()

app.use(history())
app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
