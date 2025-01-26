import express from 'express'
import path from 'node:path' // for CSS and Views
import router from './routes/router' // for Routes
import routerAuth from './routes/routerAuth' // for Routes
import dotenv from 'dotenv'
import session from 'express-session' // for Auth
import passport from 'passport' // for Auth
import './config/passport' // for Auth

dotenv.config()

const app = express()

const assetsPath = path.join(__dirname, 'public') // for CSS

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false })) // for Auth
app.use(passport.initialize()) // for Auth
app.use(passport.session()) // for Auth

app.use(express.static(assetsPath)) // for CSS
app.use(express.urlencoded({ extended: true })) // for req.body

app.use('/', router) // for routes
app.use('/auth', routerAuth) // for routes

app.set('views', path.join(__dirname, 'views')) // for views
app.set('view engine', 'ejs') // for views

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
