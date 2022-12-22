const ApiError = require("../error/error");
const {IMAGE_MAX_SIZE, IMAGE_MIMETYPES} = require("../config/fileupload.config");
module.exports = {
  checkUploadImage: async (req, res, next) => {
    try {
      if (!req.files) {
        throw  new ApiError('No files to upload', 400)
      }
      let imagesToUpload = Object.values(req.files)

      for (const image of imagesToUpload) {
        const {size, mimetype} = image
        if (size > IMAGE_MAX_SIZE) {
          throw new ApiError(`File name is too big.`)
        }

        if (!IMAGE_MIMETYPES.includes(mimetype)) {
          throw new ApiError('Please use one of valid formats', 400)
        }

      }

      next()
    } catch (err) {
      next(err)
    }
  }
}