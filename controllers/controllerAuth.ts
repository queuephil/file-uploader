import queriesAuth from '../prisma/queriesAuth'
import bcrypt from 'bcryptjs'
import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

const controllerAuth = {
  getSignUp: (req: Request, res: Response) => res.render('sign-up'),

  postSignUp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      await queriesAuth.createUser(username, hashedPassword)
      res.redirect('/')
    } catch (err) {
      next(err)
    }
  },

  getSignIn: (req: Request, res: Response) => res.render('sign-in'),

  postSignIn: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/sign-in',
  }),

  getSignOut: (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) return next(err)
      res.redirect('/')
    })
  },

  getAccount: async (req: Request, res: Response) => {
    res.render('account', { user: req.user })
  },

  // Universal Callback for all following Authentications
  getCallback: (req: Request, res: Response, next: NextFunction) => {
    const provider = req.params.provider
    passport.authenticate(provider, {
      successRedirect: '/',
      failureRedirect: '/auth/sign-in',
    })(req, res, next)
  },

  // Google Authentication
  getGoogle: passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),

  // Facebook Authentication
  getFacebook: passport.authenticate('facebook', {
    scope: ['email'],
  }),

  // GitHub Authentication
  getGitHub: passport.authenticate('github', {
    scope: ['user:email'],
  }),
}

export default controllerAuth
