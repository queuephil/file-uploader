import express from 'express'
import path from 'node:path' // for CSS and Views
import router from './routes/router' // for Routes
import routerAuth from './routes/routerAuth' // for Routes
import expressSession from './config/session' // for Session
import passport from 'passport' // for Auth
import './config/passport' // for Auth
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const assetsPath = path.join(__dirname, 'public') // for CSS

app.use(express.static(assetsPath)) // for CSS
app.use(express.urlencoded({ extended: true })) // for req.body

app.use(expressSession) // for Session

app.use(passport.initialize()) // for Auth
app.use(passport.session()) // for Auth

app.use('/', router) // for routes
app.use('/auth', routerAuth) // for routes

app.set('views', path.join(__dirname, 'views')) // for views
app.set('view engine', 'ejs') // for views

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
