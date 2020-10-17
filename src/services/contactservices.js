const { Contact } = require('../models')

// let contacts = [
//   { 
//     "name": "Arto Hellas", 
//     "phone": "040-123456",
//     "id": 1
//   },
//   { 
//     "name": "Ada Lovelace", 
//     "phone": "39-44-5323523",
//     "id": 2
//   },
//   { 
//     "name": "Dan Abramov", 
//     "phone": "12-43-234345",
//     "id": 3
//   },
//   { 
//     "name": "Mary Poppendieck", 
//     "phone": "39-23-6423122",
//     "id": 4
//   },
//   { 
//     "name": "Mary slessor", 
//     "phone": "39-23-6423122",
//     "id": 5
//   }
// ]

const { generateId } = require('../utils')

module.exports = {

  getHome(req, res){
    res.send('Hello World')
  },
  
  async getContacts(req, res){
    try {
      const contacts = await Contact.find()

      res.json(contacts)
    } catch (err) {
      res.status(500).send('Could not fetch contact at this time')
    }
  },
  
  async getInfo(req, res){
    const created = new Date(Date.now())

    try {
      const length = await Contact.countDocuments()

      res.send(`Phonebook has info for ${length} people <br><br><br> ${created}`)
    } catch (err) {
      res.status(500).send('Server could not send info at this time')
    }
  },
  
  async addContact(req, res){
    const contact = req.body
    if (!contact) return res.status(400).send('contact "name" and "phone" are required!')
    if (!contact.name) return res.status(400).send('"name" is missing!')
    if (!contact.phone) return res.status(400).send('"phone" is missing!')

    try {
      const contactExist = await Contact.countDocuments({name: contact.name})
    if (contactExist) return res.status(409).send('Contact already exist')
  
    let newContact = new Contact({
      name: contact.name,
      phone: contact.phone,
    })
   
    newContact = await newContact.save()
    res.status(201).json(newContact)
    
    } catch (error) {
      res.status(500).send('Server could not send info at this time')
    }
    
  },
  

  async patchContact(req, res){
    const {id} = req.params
    const contactUpdate = req.body
    const {name, phone}= contactUpdate
    try {
      const contactEdit = {}
      if (name) contactEdit.name = name 
      if(phone) contactEdit.phone = phone

      const contact = await Contact.findByIdAndUpdate(id, contactEdit)

      res.json(contact)
    } catch (err) {
      console.log(JSON.stringify(err, null, 2))
      res.status(500).json({ message: 'Internal server error'})
    }


  },
  
  async deleteContact(req, res){
    const {id} = req.params
    if(!id) return res.status(400).send("Id of contact is required")
    try {
      await Contact.findByIdAndRemove(id)
      res.status(204).send("Contact has been removed")
    } catch (err) {
      console.log(JSON.stringify(err, null, 2))
      res.status(500).send("Internal server error")
    }
  
  },
  
  async getContact(req, res){
    const {id} =  req.params
    try {
      const contact = await Contact.findById(id)
      if(!contact) return res.status(404).send(`contact with ID of ${id} not found`)
      res.json(contact)
    } catch (err) {
      console.log(JSON.stringify(err, null, 2))
      res.status(500).send("Internal server error")
    }
  
   
  
  }
  

}