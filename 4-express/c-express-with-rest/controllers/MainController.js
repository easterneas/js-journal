// Bayangkan di sebuah kafe, kamu adalah seorang pelanggan.
// Di sana, ada pelayan dan koki.
// Ketika kamu memesan makanan, kamu membuat sebuah "request" kepada
// pelayan terhadap apa yang mau kamu pesan.
// Lalu, pelayan meneruskan pesanan kepada koki, untuk membuat
// pesanan kamu.
// Setelah makanan selesai dibuat oleh koki, pelayan akan mengambil
// makanan tersebut dari koki, kemudian memberikan makanan tersebut
// kepada kamu.

// Dari analogi di atas, itulah cara kerja dari sebuah controller (pelayan),
// model (koki), dan sebuah browser (kamu).
// Peranan controller itu sangat penting dalam meng-handle request,
// sama halnya dengan pelayan dalam mengatur pesanan dan memberikan
// makanan (termasuk menerima pembayaran).

// Di Express, kamu bisa membuat controller dengan cara seperti ini.

// Import pool yang sudah kita buat
const dbPool = require('../config/db')

// Buat sebuah handler untuk mendapatkan Todos
const getTodos = (req, res) => {
  // Untuk menjalankan , gunakan dbPool.query()
  dbPool.query(`SELECT * FROM "todos";`, (err, result) => {
    if (err) {
      // Penanganan error jika terjadi masalah saat melakukan query
      return res.status(500).send("Internal Server Error");
    }

    console.log({ result });
    const data = result.rows;

    // Mengirimkan data sebagai respons
    res.send(data);
  });
};

// Buat sebuah handler untuk menambahkan Todo baru
const addNewTodo = (req, res) => {
  // Ekstrak title dan checked dari req.body
  const { title, checked } = req.body;

  // * Buat kondisi jika title atau checked tidak ada pada req.body
  if(!title || !checked) {
    // ! jangan lupa return untuk menghentikan function
    // ? Status: 400 Bad Request
    return res.send(400).send("title atau checked tidak ada. Pastikan isi body tersebut dikirim!")
  }

  // Query untuk memasukkan data baru ke dalam tabel todos
  // ! Challenge: coba kamu ubah query ini menjadi prepared statements/parameterized queries
  // ? Hint: Kamu bisa dapatkan jawabannya dengan membuka dokumentasi ini:
  // ?       https://node-postgres.com/features/queries#parameterized-query
  const query = `INSERT INTO todos(title, checked) VALUES('${title}', ${checked})`;

  dbPool.query(query, (err) => {
    if (err) {
      // Penanganan error jika terjadi masalah saat melakukan query
      return res.status(500).send(err.message);
    }

    // ? Hint: Jika kamu kirimkan status: 201, kamu bisa send dengan message
    res.status(201).send('Berhasil!');
  });
};

// Buat sebuah handler untuk mengubah Todo berdasarkan ID yang diterima
const updateTodo = (req, res) => {
  // Ekstrak title dan checked dari req.body
  const { title, checked } = req.body;
  // Ekstrak id dari req.params
  const { id } = req.params;

  // * Buat kondisi jika id tidak ada pada req.params
  if (!id) {
    // ! jangan lupa return untuk menghentikan function
    // ? Status: 400 Bad Request
    return res.send(400).send("id tidak diisi dengan benar.");
  }

  // * Buat kondisi jika title atau checked tidak ada pada req.body
  if (!title || !checked) {
    // ! jangan lupa return untuk menghentikan function
    // ? Status: 400 Bad Request
    return res.send(400).send("title atau checked tidak ada. Pastikan isi body tersebut dikirim!");
  }

  // Query untuk memperbarui data pada tabel todos berdasarkan id
  // ! Challenge: coba kamu ubah query ini menjadi prepared statements/parameterized queries
  // ? Hint: Kamu bisa dapatkan jawabannya dengan membuka dokumentasi ini:
  // ?       https://node-postgres.com/features/queries#parameterized-query
  const query = `UPDATE todos SET title='${title}', checked=${checked} WHERE id=${id}`;

  dbPool.query(query, (err) => {
    if (err) {
      // Penanganan error jika terjadi masalah saat melakukan query
      return res.status(500).send(err.message);
    }

    // ? Hint: Jika kamu kirimkan status: 204, send tanpa parameter apapun
    res.status(204).send();
  });
};

// Buat sebuah handler untuk menghapus Todo berdasarkan ID
const deleteTodo = (req, res) => {
  // Ekstrak id dari req.params
  const { id } = req.params;

  // Query untuk menghapus data dari tabel todos berdasarkan id
  // ! Challenge: coba kamu ubah query ini menjadi prepared statements/parameterized queries
  // ? Hint: Kamu bisa dapatkan jawabannya dengan membuka dokumentasi ini:
  // ?       https://node-postgres.com/features/queries#parameterized-query
  const query = `DELETE FROM todos WHERE id=${id}`;

  dbPool.query(query, (err) => {
    if (err) {
      // Penanganan error jika terjadi masalah saat melakukan query
      return res.status(500).send(err.message);
    }

    // ? Hint: Jika kamu kirimkan status: 204, send tanpa parameter apapun
    res.status(204).send();
  });
};

module.exports = {
  getTodos,
  addNewTodo,
  updateTodo,
  deleteTodo
}