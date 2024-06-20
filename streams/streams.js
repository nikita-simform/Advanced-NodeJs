
const express = require('express');
const fs = require('fs');

const port = 4001;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
})

//curl http://localhost:4001/write-stream
app.get('/write-stream', (req, res) => {
  const fileStream = fs.createWriteStream('./big.file');
  for (let i = 0; i <= 1e6; i++) {
    fileStream.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
  }
  fileStream.end();
  fileStream.on('finish', () => {
    res.send('File written successfully.');
  });
  fileStream.on('error', (err) => {
    console.error(err);
    res.status(500).send('Error writing file.');
  });
})

// curl http://localhost:4001/read-file
app.get('/read-file', (req, res) => {
  fs.readFile('./big.file', (err, data) => {
    if (err) throw err;
    res.end(data);
  });
})

// curl http://localhost:4001/read-stream
app.get('/read-stream', (req, res) => {
  const src = fs.createReadStream('./big.file');
  src.pipe(res);
})
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});