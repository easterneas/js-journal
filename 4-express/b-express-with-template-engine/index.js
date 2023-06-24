// ? Express dengan EJS
// Pada bagian ini akan kita pelajari cara menggunakan EJS sebagai templating
// engine untuk Express.

// Caranya seperti biasa, kita install package yang diminta terlebih dahulu --
// kamu bisa cek file package.json untuk detail package yang di-install. Namun
// secara garis besarnya, kamu install package "express" dan "ejs" untuk
// dapat menjalankan ini.

const express = require('express');

// fs akan digunakan untuk menampilkan data yang ditaruh dalam format JSON.
// Data yang akan kita lihat adalah data pada file data/products.json.
// * Perlu diingat, fs akan mengambil file berdasarkan direktori tempat
// * terminal kita berada ya.
const fs = require('fs');

// Lakukan setup Express seperti biasa
const app = express();
const PORT = 8080;

// Setelah itu, kita gunakan .set() untuk mengubah pengaturan default/bawaan
// pada Express. Dalam hal ini, kita set 'view engine' untuk menggunakan 'ejs'.
//
// .set() ini akan meminta 2 parameter:
// - key dalam bentuk string -- dalam hal ini kita isi dengan 'view engine', dan
// - value (juga) dalam bentuk string.
//
// * Kita cukup sebutkan package 'ejs' di sini sebagai value-nya
app.set('view engine', 'ejs'); // ! jangan lupa install package 'ejs' terlebih dahulu!

// Kemudian kita buat middleware dan routing seperti biasa.
// Untuk saat ini, kita gunakan express.urlencoded(), karena kita akan
// membuka alamat server pada browser saja.
app
.use(express.urlencoded({ extended: false }))
.get('/', (request, response) => {
  // ? kita import file products.json, disesuaikan dengan CWD tempat terminal
  // ? menjalankan file index.js ini
  const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

  // Untuk me-render HTML yang dibuat dengan EJS, kita sebutkan file yang akan
  // kita panggil di sini.
  // .render() meminta 2 parameter:
  // - file (tanpa extension) dalam bentuk string
  //   ! file ini harus disimpan di dalam folder views
  // - data yang akan dikirimkan dalam bentuk object
  response.render('productList', { products });
})
// Kita buat proses untuk menambah produk dengan cara yang sama...
.get('/tambah', (req, res) => {
  res.render('productForm');
})
// ...kemudian, kita buat method .post() untuk meng-handle data form yang
// akan kita kirimkan dari browser.
.post('/tambah', (req, res) => {
  // * TIP: Selalu gunakan console.log() (atau tools debugging lainnya)
  // *      untuk setiap proses yang kita akan jalankan, agar proses
  // *      development berjalan dengan lancar.
  // console.log(req.body)

  // * TIP (lagi):
  // * Di ECMAScript edisi 2022 memiliki method .at() untuk mengambil
  // * data pada index yang kita ambil, dan cara ini lebih sederhana
  // * untuk dipanggil daripada cara memanggil dengan
  // * dataArr[dataArr.length - 1]
  // .at() --> mendapatkan item berdasarkan index ke berapa
  // .at(-1) --> mendapatkan item berdasarkan index terakhir
  const newId = products.at(-1).id + 1;

  // * Ini adalah method untuk destructuring.
  // ? Destructuring adalah method untuk "mengurai" variable
  // ? dengan tipe data yang sesuai ke dalam variable baru.
  // ? Karena harus sesuai, maka pastikan tipe data yang kita
  // ? destructuring juga sesuai ya!
  // destructuring -- array
  // const [name, job] = ["Budi", "Developer"]
  // destructuring -- object
  // ? NOTE: req.body akan selalu bertipe data object.
  const { name, price } = req.body;

  // Setelah itu, kita tambahkan ke dalam array yang baru...
  products.push({
    id: newId,
    name: name,
    price: Number(price)
  });

  // ...sebelum kita tambahkan ke dalam fs dengan fs.writeFileSync.
  fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));

  // Setelah selesai, kita kembali ke halaman awal dengan menggunakan
  // method .redirect().
  // Method ini minimal meminta 1 parameter URL dalam bentuk string.
  res.redirect('/');
});

// Setelah semuanya siap, jalankan .listen() seperti biasa ya
app.listen(PORT);