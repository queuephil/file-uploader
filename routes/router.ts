import express from 'express'
import controller from '../controllers/controller'

const router = express.Router()

router.get('/', controller.getIndex)

export default router
