const express = require('express')
const cors = require('cors')
const todosRoutes = require('./routes')

// inisialisasi Express dan PORT
const app = express()
const PORT = 3000

app
// settings view engine
.set('view engine', 'ejs')
// inisialisasi middleware
.use(express.json()) // ? Karena kita mengirimkan data dengan JSON, pastikan middleware ini di-enable ya!
.use(cors())         // ? Kita juga harus menambahkan cors() middleware untuk dapat meng-handle dari origin yang berbeda.
.use(todosRoutes)    // * Setelah itu kita pasang routes *setelah* middleware terpasang.
// inisialisasi router -- setup router yang ada di routes-nya terlebih dahulu
// inisialisasi server
.listen(PORT, () => {
  console.log(`Yay! Server berhasil dijalankan di http://localhost:${PORT}`)
})