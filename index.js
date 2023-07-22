require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const server = require('http').createServer(app)
const cors = require('cors')
const { mongoose } = require('./config')

const PORT = process.env.PORT || 4000
var db = mongoose.connection

db.on('error', (err) => {
  console.log('err', err)
})

db.on('open', async () => {
  console.log('DB running')
})

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors())


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './client/build')))

app.use('/api', require('./routes'))

//set a static folder
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}))

app.use(express.json())

server.listen(PORT, () => {
  console.log(`Server up and running on ${PORT}`)
})