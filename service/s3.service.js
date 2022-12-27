const path = require('node:path')
const S3 = require('aws-sdk/clients/s3')
const uuid = require('uuid').v1
const {S3_BUCKET_REGION, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME, S3_BUCKET_URL} = require("../config");

const s3Bucket = new S3({
  region: S3_BUCKET_REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY
})

async function uploadPublicFile(fileToUpload, itemType, itemId) {
  console.log(fileToUpload);
  return s3Bucket.upload({
    ContentType: fileToUpload.mimeType,
    ACL: "public-read",
    Body: fileToUpload.data,
    Bucket: S3_BUCKET_NAME,
    Key: buildFineName(fileToUpload.name, itemType, itemId)
  }).promise()
}

async function updatePublicFile(url, file) {
  return s3Bucket.putObject({
    Bucket: S3_BUCKET_NAME,
    ACL: 'public-read',
    Key: url.split[S3_BUCKET_URL].pop(),
    Body: file.data,
  }).promise()
}

async function deletePublicFile(url) {
  return s3Bucket.delete({
    Bucket: S3_BUCKET_NAME,
    Key: url.split[S3_BUCKET_URL].pop()
  }).promise()
}

function buildFineName(fileName, itemType, itemId) {
  const ext = path.extname(fileName)
  return `${itemType}/${itemId}/${uuid()}${ext}`
}

module.exports = {
  uploadPublicFile,
  deletePublicFile,
  updatePublicFile
}