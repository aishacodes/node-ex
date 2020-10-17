require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3001,
  dbURL: process.env.DB_URL || '',
}