

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
const { generateId } = require('../utils')

module.exports = {

  getHome(req, res){
    res.send('Hello World')
  },
  
  getContacts(req, res){
    res.json(contacts)
  },
  
  getInfo(req, res){
    const lengthh = contacts.length
    const created = new Date(Date.now())
    res.send(`Phonebook has info for ${lengthh} people <br><br><br> ${created}` )
  },
  
  postContact(req, res){
  
    const contact = req.body
    if (!contact.name) return res.status(400).send('"name" is missing!')
  
    const contactExist = contacts.some(c => contact.name === c.name)
    if (contactExist) return res.status(409).send('Contact already exist')
  
    contact.id = generateId(contacts)
   
    contacts = contacts.concat(contact)
  
    res.status(201).json(contacts)
  },
  
  patchContact(req, res){
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
  
  },
  
  deleteContact(request, response){
    const {id} = request.params
    contacts = contacts.filter(contact => contact.id != id)
  
    response.status(204).end()
  },
  
  getContact(req, res){
    const {id} =  req.params
  
    const contact = contacts.find(contact => contact.id == id)
  
    if(!contact) return res.status(404).send(`contact with ID of ${id} not found`)
  
    res.json(contact)
  
  }
  

}