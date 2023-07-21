// File ini merupakan demo dasar dari TypeScript saja,
// yang mana bisa teman-teman lihat "aksi" TypeScript secara langsung.

// TypeScript merupakan superset dari JavaScript, yang dengan kata lain,
// semua sintaks JS bisa kita gunakan di sini, namun tidak secara
// sebaliknya, teman-teman.

// Sintaksnya sederhana:
// [let | const] [namaVariable][: [tipeData]] = [value]
// di mana:
// - secara keseluruhan sintaksnya mirip dengan JS, namun...
// - ...ada tambahan berupa [: [tipeData]], yang menentukan
//   tipe data dari sebuah variable.
//
// Contohnya bisa teman-teman lihat di line-line di bawah ini.
let personName: string = "budi"

// Un-comment line berikut untuk melihat error ketika kita re-assign
// variable di atas dengan tipe data lain
// personName = 8374 // Type 'number' is not assignable to type 'string'.

// Tipe data bisa kita tentukan secara implicit juga, seperti dengan
// contoh di bawah ini (kalian bisa hover kursor kalian di "grade"
// untuk melihat tipe data-nya):
let grade = "A5" // grade wagyu?

// Semua tipe data pada JavaScript, dapat kita gunakan di dalam
// TypeScript seperti contoh di atas.

// Namun ada tipe data yang hanya tersedia pada TypeScript, yaitu
// tipe data "unknown" dan "any", yang bisa kita bayangkan seperti ini:
// - "unknown"
//   --> saya "tidak tahu" tipe data apa yang dimiliki variable ini,
//       maka saya harus "cari tahu" (dengan conditionals -- if/switch)
// - "any"
//   --> saya "tidak peduli" tipe data apa yang dimiliki variable ini,
//       dan saya "tidak mau tau" function apa yang dijalankan

// ? TIP:
// ? Saya sarankan teman-teman gunakan unknown ketika mengembangkan
// ? aplikasi dengan TypeScript, karena dengan tipe data "unknown",
// ? kita bisa cari tahu tipe data apa yang dimiliki oleh suatu variable
// ? seperti yang dicontohkan pada contoh di bawah ini:

// kita declare value sebagai unknown...
let value: unknown

// ...dan misal pada suatu kode, digantilah value tersebut menjadi
// memiliki "isi"
value = 1

// karena kita masih "nggak tau" tipe data-nya apa, maka kita cari tahu
// dengan conditionals seperti di bawah ini:
if(typeof value === 'number') {
  // di sini value diasumsikan sebagai tipe data "number"
  console.log(value.toPrecision(5))
}