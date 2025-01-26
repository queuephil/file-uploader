import { Request, Response, NextFunction } from 'express'

const controller = {
  getIndex: (req: Request, res: Response) => {
    res.render('index', { user: req.user })
  },
}

export default controller
