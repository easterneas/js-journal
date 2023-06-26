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
})
// ? Kita lanjutkan dengan edit sebuah produk ya...
// ? Untuk edit, kita bisa manfaatkan Route Parameter, yang bisa kamu
// ? pelajari lebih lanjut di sini: https://expressjs.com/en/guide/routing.html#route-parameters
// ? Untuk memanfaatkan route ini, kita buat 2 route baru ya!
.get('/produk/:id', (req, res) => {
  //          ^
  // Tanda ":" di atas ini menandakan bahwa ketika ada route dengan pola seperti ini,
  // value setelah tanda "/" kedua akan disimpan ke dalam param dengan key berupa id.

  // "id" ini bisa dapat kita akses dengan mengambil data dari req.params seperti berikut:
  // * console.log(req.params.id)

  // Kita ambil data products-nya lagi
  const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

  // Lalu kita cari product dengan "id" yang dicari seperti ini...
  // ? Kita dapat manfaatkan built-in method [array].find() untuk [1] mengembalikan data
  // ? jika ditemukan, dan [2] undefined jika tidak ditemukan

  // ! Perlu diingat, setiap params yang kita kirimkan, akan selalu berupa string!
  // ? Jadi, selalu ubah tipe data menjadi tipe data yang sesuai ya...
  const product = products.find(p => p.id === Number(req.params.id));

  // Kemudian, kita dapat menjalankan 2 kondisi di sini:
  // [1] -- jika produk dengan "id" yang sama ketemu, dan
  // [2] -- jika produk yang dicari tidak ditemukan.

  // Kita bisa penuhi dengan metode guard clause, caranya seperti ini:
  // Jika produk yang dicari tidak ditemukan...
  if(!product) {
    // ...return dengan res.send().
    // return akan menghentikan function hanya sampai di sini saja
    return res.send("Produk tidak ditemukan.");
  }

  // Jika produk yang dicari ditemukan, tampilkan dengan res.render()
  res.render('productEditForm', { product });

  // * Mengapa guard clause?

  // * Guard clause, sesuai namanya, merupakan "checkpoint" untuk memeriksa
  // * apakah suatu kondisi terpenuhi atau tidak.

  // * Dari contoh di atas, kita bisa melihat bahwa dengan adanya guard clause,
  // * jika tidak ada product, akan langsung dikirim oleh server,
  // * dan fungsi tidak akan dilanjutkan (karena return akan menghentikan operasi
  // * function ini).

  // * Saya gambarkan ilustrasinya dengan garis:

  /**
   ** | Mulai
   *  |
   *? | Cek apakah produk ada atau tidak
   *  |\
   *? | \ Tidak ada
   *  |  \
   ** |   Buat res.send() dengan tulisan "Produk tidak ditemukan",
   ** |   lalu hentikan function
   *  |
   *? | Ada
   *  |
   ** Buat res.render() yang mengambil "productForm" sebagai
   ** template-nya, kemudian teruskan product yang didapat ke sana.
   */

  // * Dengan ini, struktur kodingan kita akan menjadi lebih rapi,
  // * karena tidak ada if-else.

  // ? Untuk sekarang efeknya mungkin belum terasa, namun ketika
  // ? kamu dihadapkan dengan kondisi yang kompleks...
  // ? kamu bisa coba cara ini :D

  // referensi: https://pjmcdermott92.medium.com/writing-cleaner-javascript-with-guard-clauses-fe4bb8788425
})
// Untuk meng-handle data product yang kita mau ubah, kita dapat gunakan
// method POST, sama seperti cara kita meng-handle penambahan data
// product yang baru.

// Mengapa POST? Karena sejatinya, HTML Form hanya mendukung 2 method
// seperti GET dan POST.
  .post("/produk/:id", (req, res) => {
  // Kita gunakan cara yang sama seperti cara waktu kita meng-GET
  // detail product yang kita cari ya...
  const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

  const product = products.find(p => p.id === Number(req.params.id));

  if (!product) {
    return res.send("Produk tidak ditemukan.");
  }

  // * HINT: Kita juga bisa lakukan validasi req.body, dan mengeluarkan error
  // *       dengan cara yang sama seperti contoh di atas ya... contohnya:
  if (!req.body.name) {
    return res.send("Nama produk tidak boleh kosong!")
  }

  if (!req.body.price) {
    return res.send("Harga produk tidak boleh kosong!")
  }

  // Nah, setelah itu, kita mulai update di sini nih...
  // tapi caranya bagaimana?

  // Kita (seperti biasa) mulai dengan console.log() terlebih dahulu ya
  // * console.log(product)
  // Tujuannya, agar product yang kita mau cari sama dengan ID produk
  // yang sebenarnya kita mau ubah.

  // Setelah itu, kita juga lihat data req.body yang diterima juga:
  // * console.log(req.body)

  // Kemudian, barulah kita mulai ubah product-nya
  // ! Perlu diingat, sama seperti req.params, req.body yang dikirimkan dengan urlencoded, akan selalu berupa string!
  // ? Jadi, selalu ubah tipe data menjadi tipe data yang sesuai ya...
  product.name = req.body.name
  product.price = Number(req.body.price)

  // Setelah itu, kita simpan dengan fs.writeFileSync()
  fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));

  // Setelah semuanya berhasil, kita "lemparkan" ke halaman utama
  res.redirect('/')
})

// Setelah semuanya siap, jalankan .listen() seperti biasa ya
app.listen(PORT);