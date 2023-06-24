# JavaScript (+ Node.js) Introduction

Yup! Ini adalah dasar-dasar JavaScript yang dapat dipelajari.

Jika kamu menggunakan Node.js (tidak menggunakan browser), sintaks berikut dapat juga dijalankan.

## Daftar Isi

- [Introduction](#introduction)
- [Variables](#variables)
- [Data Types](#data-types)
- [Operators](#operations)
- [Conditionals](#conditionals)
- [Loops](#loops)
- [Functions](#functions)
- [Objects](#objects)
- [Arrays](#arrays)
- [Modules](#modules)
- [Error Handling](#error-handling)

## Introduction

JavaScript adalah bahasa pemrograman interaktif yang umumnya kamu bisa temukan pada website ataupun aplikasi berbasis web.

Tidak hanya itu, dengan bantuan Node.js, kamu dapat menjalankan JavaScript tidak hanya pada browser, namun juga pada aplikasi back-end.

Nah, dengan adanya catatan ini, semoga kamu dapat mempraktikkannya dengan mudah ya. Kita mulai dari variables, yuk!

## Variables

Jika kamu pernah menggunakan bahasa pemrograman lain, kamu pasti pernah mendengar kata ini.

Variables merupakan wadah "bernama" yang dapat digunakan untuk menampung data, apapun bentuknya.

Analoginya, bayangkan variable seperti mangkuk yang bisa kamu isi dengan apapun: misalkan telur, daging ayam, sayur, bumbu, dan nasi ~~(dan jadilah nasi goreng ayam telur)~~.

Di JavaScript, ada beberapa cara mendeklarasi variable:

```js
// sebelum ES6/ECMAScript 2015
var nama = 'John';

// sejak ES6/ECMAScript 2015
let usia = 30;
const PI = 3.14;
```

Jika kamu perhatikan cara deklarasinya, kamu akan mendapatkan struktur sintaks seperti berikut:

```js
      var   nama = 'John';
      let   usia = 30;
      const PI   = 3.14;
/*    ^     ^      ^
 *    |     nama   nilai
 *    keyword
 * /
```

Dan seperti inilah kita akan mendeklarasi variable di dalam JavaScript!

Oh, sebagai catatan, kita tidak akan menggunakan `var` di sini ya, karena ada beberapa alasan berikut:

- `var` akan menempatkan variable dalam lingkup `global` -- sementara `let` dan `const` menempatkan variable dalam lingkup `local`, dan
- `var` dapat (baik sengaja atau tidak disengaja) ditimpa nilainya -- sementara `let` dan `const` (sesuai namanya) tidak

## Data Types

Ketika kita mempelajari variable di atas, kamu akan menemukan hal seperti `"John"`, `30`, dan `3.14`. Ini merupakan beberapa tipe data (data types) pada JavaScript.

Pada JavaScript, ada beberapa tipe data, seperti:

### Primitives

- String (`string`) --> mewakili nilai dalam bentuk teks, seperti `"Let's do this!"`, `'John'`, dan (sejak ES6) \``Template Literals`\` yang ditandai dengan tanda backtick (more on this later).
- Number (`number`) --> mewakili nilai dalam bentuk angka, seperti `300` dan `16.9`, atau bahkan `1_000` dan juga `10e9` (yes, kedua sintaks ini bisa dijalankan di JavaScript)
- Boolean (`boolean`) --> mewakili nilai `true` dan `false`

### Structured

- Array (`array`) --> dapat diisi oleh data-data yang (umumnya) sejenis, seperti `[ 1, 2, 3, 4, 5 ]`, `[ "John", "Doe", "Jane", "Wick", "Don" ]`, dan banyak lagi.
- Object (`object`) --> merupakan tipe data terstruktur yang sifatnya mewakili sifat/kemampuan (sederhana) suatu entitas, seperti `{ nama: "Budi", usia: 17, hobi: "ngoding", sibuk: false, belajar: () => console.log("Aku belajar JavaScript!") }`

## Special Primitive

Kita akan menemukan nilai `null`, yang merupakan salah satu nilai dari sebuah special primitives. Mengapa? Karena, `null` memiliki sifat `falsy`, meski bertipe data `object`

## Truthy dan Falsy

Bicara soal `truthy` dan `falsy`, suatu nilai bisa dikatakan `truthy` jika memiliki nilai yang **bukan** `0`, `''` (string kosong), `false`, `null`, dan `undefined`.

Nah, `falsy`, sudah pasti kebalikannya. :D

## Operators

Di JavaScript, ada 2 jenis operator: **Operator Matematika** dan **Operator Logika**.

### Operator Matematika

- Penjumlahan: `+`
- Pengurangan: `-`
- Perkalian: `*`
- Pembagian: `/`
- Modulus: `%`

```js
let hasil = 5 + 3;
let hasilPembagian = 10 / 2;
```

### Operator Logika

- `AND` --> `&&`
- `OR` --> `||`
- `NOT` --> `!`

```js
let hasilLogika = true && false;
```

## Conditionals

Conditionals digunakan untuk mengambil keputusan berdasarkan kondisi tertentu. JavaScript memiliki pernyataan percabangan `if`, `else if`, dan `else`. Contohnya:

```js
let nilai = 80;

if (nilai > 90) {
  console.log('Nilai A');
} else if (nilai > 80) {
  console.log('Nilai B');
} else {
  console.log('Nilai C');
}
```

## Loops

Perulangan digunakan untuk mengulang blok kode tertentu. JavaScript memiliki pernyataan perulangan `for`, `while`, dan `do while`. Contohnya:

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}

let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);
```

## Functions

Fungsi adalah blok kode yang dapat dipanggil untuk melakukan tugas tertentu. Contohnya:

```js
function tambah(a, b) {
  return a + b;
}

let hasil = tambah(2, 3);
console.log(hasil);
```

## Objek

Objek adalah struktur data kompleks yang dapat memiliki properti dan metode. Contohnya:

```js
let person = {
  nama: 'John',
  usia: 30,
  sapa: function() {
    console.log('Halo, nama saya ' + this.nama);
  }
};

console.log(person.nama);
person.sapa();
```

## Array

Array adalah tipe data yang digunakan untuk menyimpan beberapa nilai dalam satu variabel. Contohnya:

```js
let buah = ['apel', 'jeruk', 'pisang'];

console.log(buah[0]);
buah.push('anggur');
console.log(buah.length);
```

## Modules

Bicara soal `modules`, bayangkan `modules` seperti kepingan puzzle yang dapat kamu pasang di manapun dibutuhkan.

Pada contoh ini, akan digunakan `modules` dengan jenis CommonJS:

```js
// file: module.js
module.exports = {
  tambah: function(a, b) {
    return a + b;
  },
  kurang: function(a, b) {
    return a - b;
  }
};

// main.js
const module = require('./module.js');
console.log(module.tambah(2, 3));
```

Bicara `CommonJS`, `CommonJS` adalah sistem module yang umum digunakan pada Node.js. Namun, ada satu sistem module lagi, yaitu `ES modules` atau `ESM`.

`ESM` ini umum digunakan pada browser, dan ada banyak perbedaan antara keduanya. Kamu bisa [cek postingan ini](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) untuk mempelajari lebih dalam antara keduanya.

## Error Handling

Ketika kamu membuat aplikasi, ada di satu titik aplikasi kamu akan mengalami masalah. Ketika masalah terjadi, aplikasi kamu akan berhenti bekerja (alias di-`terminate`).

Untungnya, seperti bahasa pemrograman lainnya, JavaScript memiliki cara untuk menangani error jika terjadi masalah. Mungkin kamu pernah mendengar istilah `try-catch` (atau `try-catch-finally`) sebelumnya...

Jika iya, sintaksnya juga kurang lebih sama, sehingga kamu dapat menggunakannya dengan mudah!

```js
try {
  // Coba kita jalankan ini, di mana nonFunctional() tidak kita buat sebelumnya.
  nonFunctional()
} catch (error) {
  // Penanganan kesalahan
  console.log('Wah, terjadi kesalahan nih... ' + error.message);
} finally {
  // Blok kode yang akan dijalankan selalu
  console.log('Aplikasi tetap dilanjutkan!');
}
```