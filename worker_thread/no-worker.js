const express = require('express');
const port = 5000;

const app = express();

const LOOP_COUNT = 5_00000_00000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" })
})

app.get("/heavy", (req, res) => {
  let count = 0;
  for (let i = 0; i < LOOP_COUNT; i++) {
    count++;
  }
  res.status(200).json({ message: `Total Count: ${count}` })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
