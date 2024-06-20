const fs = require("node:fs");

// synchronously deleting a file
fs.unlinkSync('file.txt');

//  Asynchronously deleting a file
fs.unlink('file.txt', (err) => {
  if (err) {
    console.log("error: ", err);
  }
  console.log("File deleted successfully!");
})

// Remove directory synchronously
if (fs.existsSync('Test')) {
  console.log("Directory exist");
  fs.rmdirSync('Test');
  console.log("Directory deleted");
} else {
  console.log("Directory not exist");
}

// Remove directory asynchronously
fs.rmdir("files", (err) => {
  if (err) {
    console.log("error: ", err);
    return;
  } else {
    console.log("Directory deleted");
  }
});