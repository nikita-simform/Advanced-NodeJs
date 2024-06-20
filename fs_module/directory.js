const fs = require("node:fs");
const path = require("path");

console.log("__dirname", __dirname);

fs.readFile(path.join(__dirname, "file.txt"), "utf-8", (error, data) => {
  if (error) {
    console.log("error: ", error);
  } else {
    console.log("data: ", data);
  }
});

// Function to recursively create directories
function createDirectoryRecursively(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

// Function to write a file into nested folder
function writeFileToNestedFolder(folderPath, fileName, content) {
  // create a nested directory if they don't exist
  createDirectoryRecursively(folderPath);

  // construct full path to the file
  const filePath = path.join(folderPath, fileName);
  console.log("filePath: ", filePath);

  // write content to the file
  fs.writeFileSync(filePath, content);

  console.log(`File ${fileName} created successfully in ${folderPath}`);
}

const nestedFolderPath = "files/directory/example";
const fileName = "example1.txt";
const fileContent = "This is an example file content.";

writeFileToNestedFolder(nestedFolderPath, fileName, fileContent);

// createDirectoryRecursively(path.join(__dirname,'example/test/test1'));

fs.renameSync('file.txt', 'test.txt');