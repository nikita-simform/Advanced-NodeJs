
const fs = require('node:fs/promises');

// Asynchronous file reading with promise
fs.readFile("./file.txt", "utf-8")
  .then((data) => console.log("data: ", data))
  .catch((error) => console.log("error: ", error));

// Asynchronous file reading with async await
async function readFile() {
  try {
    const data = await fs.readFile("./file.txt", "utf-8");
    console.log("data", data);
  } catch (error) {
    console.log("error: ", error);
  }
}

readFile();