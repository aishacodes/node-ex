const router =  require('express').Router()

const {
  getHome,
  getContacts,
  getInfo,
  getContact,
  addContact,
  patchContact,
  deleteContact,
} = require('../services/contactservices') 


router.get('/' , getHome)

router.get('/contacts/', getContacts)

router.get('/info/', getInfo)

router.post('/contacts', addContact)

router.patch('/contacts/:id', patchContact)

router.delete('/contacts/:id', deleteContact)

router.get('/contact/:id', getContact)



module.exports = router