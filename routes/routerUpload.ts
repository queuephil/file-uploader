import express from 'express'
import controllerUpload from '../controllers/controllerUpload'

const routerUpload = express.Router()

routerUpload.post('/', controllerUpload.postUpload)

export default routerUpload
