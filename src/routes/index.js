const router =  require('express').Router()

const {
  getHome,
  getContacts,
  getInfo,
  getContact,
  postContact,
  patchContact,
  deleteContact,
} = require('../services/contactservices') 


router.get('/' , getHome)

router.get('/contacts/', getContacts)

router.get('/info/', getInfo)

router.post('/contacts', postContact)

router.patch('/contacts/:id', patchContact)

router.delete('/contacts/:id', deleteContact)

router.get('/contacts/:id', getContact)



module.exports = router