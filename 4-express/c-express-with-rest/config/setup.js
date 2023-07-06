// * Ini adalah cara untuk melakukan setup
// ? HINT: Ini adalah cara yang (kurang lebih sama) seperti apa yang kamu
// ?       pelajari dengan Sequelize nantinya
const dbPool = require('./db')

// * Kamu dapat ganti nama database sesuai dengan kebutuhan di sini,
// * dan pastikan nama database-nya sama seperti yang ada pada
// * file config/db.js ya!
dbPool.query(`CREATE DATABASE "test"`, (err, result) => {
  // ? Setelah kita berhasil menambahkan database,
  // ? kita buat table di dalam sebuah function callback dengan
  // ? cara seperti ini.
  dbPool.query(`
    CREATE TABLE IF NOT EXISTS "todos" (
      id      SERIAL       PRIMARY KEY,
      title   VARCHAR(100) NOT NULL,
      checked BOOLEAN      NOT NULL
    )
  `, (errTable, resultTable) => {
    console.log({err, result, errTable, resultTable})
  })
})