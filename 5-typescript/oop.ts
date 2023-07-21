// Di pemrograman berbasis OOP, kalau ada class, pasti
// ada interface (antarmuka).

// Nah, di TypeScript, interface diadakan sebagai "type" untuk class
// ataupun module (instance?) object.

// Cara penggunaannya sama seperti kita menggunakan type, namun kita
// gantikan dengan interface.
interface Person {
  name: string;
  address: string;

  walk(): void;
}

// Kita juga bisa extend interface di atas menjadi sebuah interface
// yang baru, seperti pada contoh di bawah ini.
interface Consumer extends Person {
  // Di sini, semua property dan method yang dimiliki Consumer sudah
  // ada semua, kita tinggal menambahkan property/method yang hanya
  // ada pada interface Consumer saja. Misal:
  walletBalance: number;

  buy(product: string): void;
}

// Kemudian, dari kedua interface ini, kita bisa gunakan di class masing-masing.
// Cobalah kamu hapus salah satu dari property yang tersedia di bawah ini.
class StoreCustomer implements Consumer {
  name = "";
  address = "";
  walletBalance = 0;

  walk() {} // kamu boleh isi dengan function apapun di sini.
  buy(product: string) {} // kamu boleh isi dengan function apapun di sini.
}
