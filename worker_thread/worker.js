const {
  parentPort,
  workerData,
  getEnvironmentData,
  isMainThread
} = require("node:worker_threads");

let count = 0;

const { LOOP_COUNT } = workerData;

console.log("environment data:", getEnvironmentData("Nikita"));

parentPort.on("message", (data) => {
  console.log("message from parent thread:", data)
})

for (let i = 0; i < LOOP_COUNT; i++) {
  count++;
}
parentPort.postMessage(count)