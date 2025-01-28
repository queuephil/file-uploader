import express from 'express'
import controllerFiles from '../controllers/controllerFiles'

const routerFiles = express.Router()

routerFiles.get('/create-file/:user/:parent', controllerFiles.getCreateFile)
routerFiles.post('/create-file/:user/:parent', controllerFiles.postCreateFile)

routerFiles.get(
  '/create-folder/:user/:parent?',
  controllerFiles.getCreateFolder
)
routerFiles.post(
  '/create-folder/:user/:parent?',
  controllerFiles.postCreateFolder
)

routerFiles.post('/delete-file/:id/:name', controllerFiles.postDeleteFile)
routerFiles.post('/delete-folder/:id', controllerFiles.postDeleteFolder)

export default routerFiles
