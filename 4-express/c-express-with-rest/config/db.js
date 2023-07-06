const { Pool } = require('pg')

// ? Kamu dapat ganti sesuai dengan konfigurasi yang ada pada perangkatmu ya
const dbPool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'test'
})

module.exports = dbPool