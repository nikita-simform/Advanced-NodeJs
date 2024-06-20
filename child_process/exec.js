//we cna run a command inside a shell 

const { exec } = require("child_process");

exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.log(`Error: ${error.message}`)
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`)
  }
  console.log(`stdout: ${stdout}`)
})
//can not be used which as huge stdout
// e.g. exec('/find')