import express from 'express'
import controllerAuth from '../controllers/controllerAuth'

const routerAuth = express.Router()

routerAuth.get('/sign-up', controllerAuth.getSignUp)
routerAuth.post('/sign-up', controllerAuth.postSignUp)

routerAuth.get('/sign-in', controllerAuth.getSignIn)
routerAuth.post('/sign-in', controllerAuth.postSignIn)

routerAuth.get('/sign-out', controllerAuth.getSignOut)

routerAuth.get('/account', controllerAuth.getAccount)

// Universal Callback for all following Authentications
routerAuth.get('/:provider/callback', controllerAuth.getCallback)

// Google Authentication
routerAuth.get('/google', controllerAuth.getGoogle)

// Facebook Authentication
routerAuth.get('/facebook', controllerAuth.getFacebook)

// GitHub Authentication
routerAuth.get('/github', controllerAuth.getGitHub)

export default routerAuth
