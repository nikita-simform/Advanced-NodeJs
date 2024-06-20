const express = require("express");
const { fork } = require("child_process")
const port = 8000;

const app = express();

// npx loadtest - n 10 - c 10 http://localhost:8000/one
app.get('/one', (req, res) => {
  const sum = longComputation();
  res.send({ sum })
})

// npx loadtest - n 10 - c 10 http://localhost:8000/two
app.get('/two', async (req, res) => {
  const sum = await longComputationPromise();
  res.send({ sum })
})

//To utilize full power of CPU
app.get('/three', (req, res) => {
  const child = fork('./longtask.js');
  child.send('start');
  child.on('message', (sum) => {
    res.send({ sum })
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

function longComputation() {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i
  }
  return sum
}

function longComputationPromise() {
  return new Promise((resolve, reject) => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
      sum += i
    }
    resolve(sum)
  })

}