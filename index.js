const { json } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')



require('dotenv').config()

morgan.token('body' , (req , res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.disable('x-powered-by')
app.use(json())



let contacts = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  },
  { 
    "name": "Mary slessor", 
    "number": "39-23-6423122",
    "id": 5
  }
]
const generateId = () => Math.random().toString(36).substring(2, 7)

app.get('/' , (req, res) => {
  res.send('Hello World')
})

app.get('/api/contacts/', (req, res) => {
  res.json(contacts)
})

app.get('/info/', (req, res) => {
  const lengthh = contacts.length
  const created = new Date(Date.now())
  res.send(`Phonebook has info for ${lengthh} people <br><br><br> ${created}` )
})

app.post('/api/contacts', (req, res) => {

  const contact = req.body
  if (!contact.name) return res.status(400).send('"name" is missing!')

  const contactExist = contacts.some(c => contact.name === c.name)
  if (contactExist) return res.status(409).send('Contact already exist')

  contact.id = generateId()
 
  contacts = contacts.concat(contact)

  res.status(201).json(contacts)
})

app.patch('/api/contacts/:id', (req, res) => {
  const {id} = req.params
  const contact = contacts.find((contact) => contact.id == id)
  const contactUpdate = req.body
  contacts = contacts.map((contact) => {
    if (contact.id == id) {
      contact = {
        ...contact,
        ...contactUpdate
      }
    }

    return contact
  })

  res.json({
    ...contact,
    ...contactUpdate
  })

})

app.delete('/api/contacts/:id', (request, response) => {
  const {id} = request.params
  contacts = contacts.filter(contact => contact.id != id)

  response.status(204).end()
})

app.get('/api/contacts/:id', (req, res) => {
  const {id} =  req.params

  const contact = contacts.find(contact => contact.id == id)

  if(!contact) return res.status(404).send(`contact with ID of ${id} not found`)

  res.json(contact)

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('App is running on port', PORT)
})