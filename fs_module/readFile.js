const fs = require("node:fs");

console.log("first");

// Synchronous file reading:
// It' will return buffer data in binary formate
// utf-8 convert binary data into human readable formate
const fileContent = fs.readFileSync('./file.txt', 'utf-8');
console.log('fileContent: ', fileContent);

console.log("Second");

// Asynchronous file reading with callback function:
fs.readFile('./file.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log('error: ', error);
  } else {
    console.log('data: ', data);
  }
})

console.log("Third");