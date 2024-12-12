const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require("multer");
const multerS3 = require('multer-s3');
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const bucketName = process.env.BUCKET_NAME
const region = process.env.BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), async function (req, res) {
  const uploadParams = {
    Bucket: bucketName,
    Body: req.file.buffer,
    Key: req.file.originalname,
    ContentType: req.file.mimetype
  }
  await s3Client.send(new PutObjectCommand(uploadParams));

  res.send('File uploaded!')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});