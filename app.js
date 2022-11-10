const fs = require('node:fs');
const builder = require('./students/createstudent')


//прочитати файл
// fs.readFile('text', (err, data) => {
//   console.log(err, 'Err');
//   console.log(data.toString());
// })

//вставити щось в файл
// fs.appendFile('text', 'Hello Roksi \n', (err) => {
//   console.log('Err',err);
// })

//все стирає і вписує те що передаси
// fs.writeFile('text', 'Write file', (err) => {
//   console.log('Err', err);
// })

// fs.readFile('copy', (err, data) => {
//   fs.appendFile('text', data, (err) => {
//     console.log('Err', err);
//   })
// })

//створює папку
// fs.mkdir('students', (err) => {
//   console.log('Err', err);
// })

//створення вложеного файлу з даними
// fs.appendFile('./students/data.json', JSON.stringify({gender: 'male', name: 'Bohdan'}), (err) => {
//   console.log(err);
// })

//чистить файл
// fs.truncate('text', (err, data) => {
//   console.log('Err', err);
// })

//видаляє файл
// fs.unlink('copy', (err) => {
//   console.log('Err', err);
// })

//видаляє папку
// fs.rmdir('hello',(err)=>{
//   console.log(err);
// })

//перейменувати файл
// fs.rename('text','test',(err)=>{
//   console.log(err);
// })

//переміщає файли
// fs.rename('dmytro','students/dmytro',(err)=>{
//   console.log(err);

// builder.studentBuilder().sleep()


// fs.readdir('students', (err, files) => {
//   console.log(files);
//
//   for (let fileName of files){
//     fs.stat(`students/${fileName}`,(err1, stats)=>{
//       console.log(stats.isFile());
//       if(stats.isFile()){
//         fs.readFile(`./students/${fileName}`,(err2,data)=>{
//           console.log(data.toString());
//         })
//       }
//     })
//   }
// })

// fs.readdir('students',{withFileTypes:true},(err,files)=>{
//     console.log(files);
//
//     for (let name of files){
//       console.log(name.isFile());
//     }
//   }
// )


// fs.appendFile('students/girls/valya.json',JSON.stringify({gender:'female',
// name:'Valya'}),(err)=>{
//   console.log(err);
// })

// fs.unlink('students/girls/valya.json',(err)=>{
//   console.log(err);
// })

fs.readdir('students/girls',(err, files)=>{
  for (let file of files){
    fs.readFile(`students/girls/${file}`,(err1,data)=>{
    const gender = JSON.parse(data.toString()).gender
      if (gender === 'male'){
        fs.rename(`students/girls/${file}`,`students/boys/${file}`,(err2)=>{
          console.log(err2);
        } )
      }
    })
  }
})

fs.readdir('students/boys',(err, files)=>{
for (let file of files ){
  fs.readFile(`students/boys/${file}`,(err1,data)=>{
    const gender = JSON.parse(data.toString()).gender;
    if(gender === 'female'){
      fs.readFile(`students/boys/${file}`, `students/girls/${file}`, (err2)=>{
        console.log(err2);
      })
    }
  })
}
})


