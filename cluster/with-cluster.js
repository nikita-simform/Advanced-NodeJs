const express = require('express');
const port = 3000;

const cluster = require('node:cluster');
const totalCPUs = require('node:os').cpus().length;
const process = require('node:process');

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });

} else {
  startExpress();
}

function startExpress() {
  const app = express();
  console.log(`Worker ${process.pid} started`);

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/test-api', function (req, res) {
    console.time('slowApi');
    const baseNumber = 7;
    let result = 0;
    for (let i = Math.pow(baseNumber, 7); i >= 0; i--) {
      result += Math.atan(i) * Math.tan(i);
    };
    console.timeEnd('slowApi');

    console.log(`Result number is ${result} - on process ${process.pid}`);
    res.send(`Result number is ${result}`);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
// npx loadtest - n 1000 - c 300 - k http://localhost:3000/test-api