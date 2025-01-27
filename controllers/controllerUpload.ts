import { Request, Response } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload') // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname) // Use the original file name
  },
})

const upload = multer({ storage })

const controllerUpload = {
  postUpload: [
    upload.single('uploaded_file'),
    (req: Request & { file?: Express.Multer.File }, res: Response) => {
      // req.file is the file object (if uploaded)
      // req.body will hold any text fields
      //   console.log(req.file, req.body)
      res.redirect('/')
    },
  ],
}

export default controllerUpload
