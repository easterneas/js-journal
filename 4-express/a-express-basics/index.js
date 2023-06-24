// ? Import Express dengan cara ini
const express = require('express')

// ? Panggil express() yang akan disimpan ke dalam variable baru
const app = express()

// * TIP: PORT ini akan berguna ketika kamu melakukan deployment di kemudian hari.
// *      Untuk sementara ini, kita akan set secara manual, namun ditaruh ke dalam
// *      Variable terlebih dahulu ya.
const port = 8080

// ? Inisialisasi server Express
// * TIP: Kamu dapat lakukan method chaining di sini untuk .use(), dan method
// *      handler seperti .get() dan .post().
app
// ? Siapkan built-in middleware di sini...
// Middleware ini akan meng-handle request.body yang dikirimkan dalam
// tipe konten (Content-Type) application/json
.use(express.json())
// Middleware di bawah ini akan meng-handle request.body yang dikirimkan dalam
// tipe konten (Content-Type) application/x-www-form-urlencoded
// ! Untuk tujuan keamanan, set { encoding: false }, kecuali ada request spesifik
// ! yang harus dikirimkan.
.use(express.urlencoded({ extended: false }))
// * NOTE: Ada lagi satu Content-Type yang akan meng-handle upload file, yang
// *       bernama multipart/form-data. Ini akan dibahas lain waktu ya!

// ? Route Handling
// Ada beberapa method yang dapat digunakan untuk meng-handle route, seperti
// .get() dan .post(), yang disesuaikan untuk method HTTP seperti GET, POST,
// PUT, PATCH, DELETE, atau method HTTP lainnya.
//
// route handler mewajibkan kita untuk memasukkan 2 parameter:
// - route/url dalam bentuk string, dan
// - handler dalam bentuk function
//
// .get() akan meng-handle HTTP request dengan method GET
.get('/', (request, response) => {
  // * Jika kamu penasaran tentang isi request dan response,
  // * kamu dapat un-comment line di bawah ini.
  // console.log({request, response})

  response.send("Halo! Ini adalah response dari server ke dalam browser.")
})
// .post() akan meng-handle HTTP request dengan method POST
// Untuk mengetes method ini, bisa kamu gunakan hoppscotch.io atau postman.co.
.post('/', (request, response) => {

  console.log(request.body)
  response.send("Data berhasil dikirim!")
})

// ? Siap dijalankan!
// Di langkah ini, server siap dijalankan. Kamu dapat jalankan dengan method
// .listen().
//
// Method ini meminta 1 parameter wajib dan 1 parameter optional:
// - port dalam bentuk number (wajib) -- kita cantumkan variable PORT yang kita buat
//   sebelumnya, dan
// - handler (optional) -- untuk menjalankan function tambahan setelah server
//   siap dijalankan.
.listen(port, () => {
  console.log(`Server berhasil dinyalakan nih! Buka http://localhost:${port}`)
})