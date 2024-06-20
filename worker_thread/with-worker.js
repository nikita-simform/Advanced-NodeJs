const {
  Worker,
  isMainThread,
  setEnvironmentData
} = require("node:worker_threads")

const express = require('express');
const port = 5001;

const app = express();

const LOOP_COUNT = 5_00000_00000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" })
})

app.get("/heavy", (req, res) => {
  console.log("is main thread:", isMainThread);
  //Used to communicate with worker thread
  setEnvironmentData("Nikita", "Prajapati")
  const worker = new Worker('./worker.js', {
    workerData: {
      LOOP_COUNT
    }
  })
  worker.on("online", () => {
    console.log("Worker started execution")
  })

  worker.on("message", (data) => {
    res.status(200).json({ message: `Total Count: ${data}` })
  })

  worker.postMessage("Hello from parent")

  worker.on("error", (error) => {
    console.log("Error from worker:", error)
  })
  worker.on("exit", (code) => {
    if (code != 0) reject(new Error(`Worker stopped with exit code ${code}`))
  })
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
