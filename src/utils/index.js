const generateId = (contacts) => Math.max(...contacts.map(con => con.id))+1

module.exports = {
  generateId
}