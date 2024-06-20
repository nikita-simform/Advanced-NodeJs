const { execFile } = require("child_process");

// to change the permission of the file to be executable : chmod + x somefile.sh
execFile('./somefile.sh', (error, stdout, stderr) => {
  if (error) {
    console.log(`Error: ${error.message}`)
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`)
  }
  console.log(`stdout: ${stdout}`)
})