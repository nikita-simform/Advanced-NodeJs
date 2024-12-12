const { GetObjectCommand, S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "nikita.private",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function putObject(fileName, contentType) {
  const command = new PutObjectCommand({
    Bucket: "nikita.private",
    Key: `/upload/user-uploads/${fileName}`,
    ContentType: contentType
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}
async function init() {
  // console.log(await getObjectURL("main-image.jpg"));
  console.log(await getObjectURL("/upload/user-uploads/image-1723114669715.jpeg"));

}

async function uploadFile(fileName, contentType) {
  console.log("URL for upload:", await putObject(`image-${Date.now()}.jpeg`, 'image/jpeg'))
}
init();
// uploadFile();