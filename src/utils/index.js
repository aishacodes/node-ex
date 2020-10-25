const generateId = (contacts) => Math.max(...contacts.map(con => con.id))+1


const handleServerResponse = (res, data, statusCode = 200, err) => { 
  if (err) console.log(JSON.stringify(err, null, 2))

  if(statusCode>=400) return res.status(statusCode).send(data)
  return res.status(statusCode).json(data)
}
module.exports = {
  generateId, handleServerResponse
}