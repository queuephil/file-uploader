import { Request, Response } from 'express'
import queriesFiles from '../prisma/queriesFiles'

interface User {
  id: number
}

const controller = {
  getIndex: async (req: Request, res: Response) => {
    const userId = (req.user as { id: number })?.id
    const folders = await queriesFiles.readAll(userId)
    res.render('index', { user: req.user, folders })
  },
}

export default controller
