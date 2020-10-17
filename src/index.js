const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const { port, dbURL } = require('./utils/config')
const Apirouter = require('./routes')

morgan.token('body' , (req , res) => JSON.stringify(req.body))

const app = express()

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.disable('x-powered-by')
app.use(json())
app.use('/api/v1', Apirouter)
app.use('/v1', Apirouter)



app.listen(port, () => {
  console.log('App is running on port', port)
})