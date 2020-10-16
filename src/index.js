const { json } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


require('dotenv').config()
const Apirouter = require('./routes')

morgan.token('body' , (req , res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.disable('x-powered-by')
app.use(json())
app.use('/api/v1', Apirouter)
app.use('/v1', Apirouter)





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('App is running on port', PORT)
})