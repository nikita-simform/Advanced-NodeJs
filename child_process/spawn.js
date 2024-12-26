const { spawn } = require("child_process");

const child = spawn("ls", ["-l"]);
// const child = spawn("find", ["/"]);

child.stdout.on('data', (data) => {
  console.log(`stdout:${data}`)
})

child.stderr.on('data', (data) => {
  console.log(`stderr:${data}`)
})

child.on('error', (error) => {
  console.log(`error:${error}`)
})

child.on('exit', (code, signal) => {
  if (code) {
    console.log(`Process exit with code:${code}`)
  }
  if (signal) {
    console.log(`Process killed with signal:${signal}`)
  }
  console.log("Done")
})


//spawn does not user buffer, it uses stream 
//So it will return all the output from find/ command