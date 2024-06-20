const fs = require("node:fs");
// Synchronous file write:
fs.writeFileSync('./file.txt', 'Hello World!');

// Asynchronous file writing with callback function:
fs.writeFile('./file.txt', "Hello Everyone!!!!!", (error) => {
  if (error) {
    console.log("error: ", error);
  }
  console.log("Data written successfully!");
});

// For append text into write file
fs.writeFile("./file.txt", " Hello World!", { flag: "a" }, (error) => {
  if (error) {
    console.log("error: ", error);
  }
  console.log("Data appended successfully!");
});


// flags:
// r+ 
// w+
// a
// a+