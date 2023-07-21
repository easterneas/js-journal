// Pada dasarnya, struktur function pada TypeScript memiliki struktur yang sama
// seperti pada JavaScript, dan bedanya hanya pada deklarasi tipe data
// pada variable parameter. Contohnya bisa dilihat di bawah ini:

function sayHello (name: string, classRoom: string) {
  return `Halo kelas ${classRoom}! Saya ${name}, dan saya senang belajar TypeScript.`
}

console.log(sayHello("Budi", "Online"))
// Akan menghasilkan: `Halo kelas Online! Saya Budi, dan saya senang belajar TypeScript.`

function recursiveSum (num: number, count: number) {
  let result = 0

  for(let i = 0; i < count; i = i + 1) {
    result = result + num
  }

  return result
}

console.log(recursiveSum(10, 4)) // Akan menghasilkan: 40

// Ketika kita berhadapan dengan function yang memiliki optional parameter
// seperti di bawah ini, kita dapat menggunakan "?" untuk membuat
// parameter tersebut menjadi optional/tambahan saja.

function optionalFn (name: string, job?: string) {
  let message = `Halo, saya ${name}!`

  // ! Karena optional, maka jangan lupa kita tambahkan conditionals ya!
  if(job) {
    message = message + `\nSaya bekerja sebagai ${job}.`
  }

  return message
}

console.log(optionalFn("Anto"))
// Akan menghasilkan:
// Halo, saya Anto!

console.log(optionalFn("Paijo", "TypeScript developer"))
// Akan menghasilkan:
// Halo, saya Paijo!
// Saya bekerja sebagai TypeScript developer.

// Suatu ketika, kamu akan mendapati suatu function harus menerima berbagai
// macam data yang berbeda tipe data-nya.

// Kamu bisa saja menambahkan type seperti:
// value: string | number | string[] | ... | (tipe-tipe lainnya)

// ...tapi ketika nanti kamu berhadapan dengan banyak jenis data yang berbeda,
// typing di atas akan menjadi kompleks.

// Nah, di TypeScript, kita bisa menerapkan function dengan tipe data
// generik (generics), yang bertujuan untuk menerima tipe data yang bersifat dinamis.

// Contohnya bisa kamu lihat pada contoh di bawah ini:

//                           Returning data type
//                                             v
//                      Param --------\        v
//                          v         v        v
//         Generics         v         v        v
//                v         v         v        v
//                v         v         v        v
function looping <T>(value: T, count: number): string[] {
  const messages: string[] = []

  for(let i = 0; i < count; i = i + 1) {
    messages.push(`Pesan ke: ${i + 1} -- ${value}`)
  }

  return messages
}

// Generics merupakan tipe data dinamis yang kita bisa kirimkan
// berdasarkan value apa yang kita kirimkan.

// Sementara "returning data type" adalah, kita akan menentukan
// tipe data apa yang akan dikembalikan oleh function di atas.

// Kamu bisa mencoba utak-atik kode di bawah ini, lalu arahkan
// kursor kamu pada tulisan "looping". Di sana, kamu akan dapatkan
// bahwa masing-masing function looping() akan menerima tipe data
// yang berbeda, tapi nggak perlu static typing secara kompleks.
console.log(looping("Budi", 3))
console.log(looping(true, 1))