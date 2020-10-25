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

const { generateId, handleServerResponse } = require('../utils')

module.exports = {

  getHome(req, res){
    handleServerResponse(res, 'Hello world')
  },
  
  async getContacts(req, res){
    try {
      const contacts = await Contact.find()

      handleServerResponse(res, contacts)
    } catch (err) {

      handleServerResponse(res, 'Internal server error: Could not fetch contact at this time', 500, err)
    }
  },
  
  async getInfo(req, res){
    const created = new Date(Date.now())

    try {
      const length = await Contact.countDocuments()

      res.send(`Phonebook has info for ${length} people <br><br><br> ${created}`)
    } catch (err) {

      handleServerResponse(res, 'Internal server error', 500, err)
      
    }
  },
  
  async addContact(req, res){
    const contact = req.body
    if (!contact) return handleServerResponse(res, 'contact "name" and "phone" are required!', 400) 

    if (!contact.name) return handleServerResponse(res, '"name" is missing!', 400 )

    if (!contact.phone) return handleServerResponse(res, '"phone" is missing!', 400) 

    try {
      const contactExist = await Contact.countDocuments({name: contact.name})
    if (contactExist) return handleServerResponse(res, 'Contact already exist', 409)
  
    let newContact = new Contact({
      name: contact.name,
      phone: contact.phone,
    })
   
    newContact = await newContact.save()
    handleServerResponse(res, newContact, 201)
    
    } catch (error) {

      handleServerResponse(res, 'Server could not send info at this time', 500, error)
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

      handleServerResponse(res, contact)
    } catch (err) {

      handleServerResponse(res, 'Internal server error', 500 , err )
    }


  },
  
  async deleteContact(req, res){
    const {id} = req.params
    if(!id) return handleServerResponse(res, "Id of contact is required", 400)

    try {
      await Contact.findByIdAndRemove(id)

      handleServerResponse(res, "Contact has been removed", 204 )

    } catch (err) {
      handleServerResponse(res, 'Internal server error', 500)

    }
  
  },
  
  async getContact(req, res){
    const {id} =  req.params
    try {
      const contact = await Contact.findById(id)
      if(!contact) return handleServerResponse(res, `contact with ID of ${id} not found`, 404 )

      handleServerResponse(res, contact)
    } catch (err) {

      handleServerResponse(res, "Internal server error", 500, err )
    }
  
   
  
  }
  

}