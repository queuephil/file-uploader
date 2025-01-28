import { Request, Response } from 'express'
import multer from 'multer'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import queriesFiles from '../prisma/queriesFiles'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

const controllerFiles = {
  getCreateFile: (req: Request, res: Response) => {
    res.render('create-file', { user: req.user, parent: req.params.parent })
  },
  postCreateFile: async (req: Request, res: Response): Promise<void> => {
    upload.single('uploaded_file')(req, res, async (err) => {
      // Get temp filename & path
      const { originalname, path: filePath } = req.file as Express.Multer.File
      // Read the file as a buffer
      const fileBuffer = fs.readFileSync(filePath)
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('root')
        .upload(originalname, fileBuffer, {
          cacheControl: '3600',
          upsert: true,
        })
      // Create database entry
      queriesFiles.createFile(
        originalname,
        `https://hpfzbfpfpvzotjwjviar.supabase.co/storage/v1/object/public/root//${data?.path}`,
        parseInt(req.params.parent),
        1
      )
      // Delete temporary file
      fs.unlinkSync(filePath)
      // Redirect
      res.redirect('/')
    })
  },
  getCreateFolder: (req: Request, res: Response) => {
    res.render('create-folder', { user: req.user, parent: req.params.parent })
  },
  postCreateFolder: (req: Request, res: Response) => {
    queriesFiles.createFolder(
      req.body.foldername,
      parseInt(req.params.parent),
      parseInt(req.params.user)
    )
    res.redirect('/')
  },
  postDeleteFile: async (req: Request, res: Response) => {
    const { data, error } = await supabase.storage
      .from('root')
      .remove([req.params.name])
    queriesFiles.deleteFile(parseInt(req.params.id))
    res.redirect('/')
  },
  postDeleteFolder: (req: Request, res: Response) => {
    queriesFiles.deleteFolder(parseInt(req.params.id))
    res.redirect('/')
  },
}

export default controllerFiles
