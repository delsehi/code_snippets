import express from 'express'
import dotenv from 'dotenv'
import flash from 'express-flash-messages'
import path from 'path'
import helmet from 'helmet'
import configDB from './configDB.js'
import { router } from './routes/router.js'
import session from 'express-session'
dotenv.config()

const app = express()
const __dirname = path.resolve();
const baseURL = process.env.BASE_URL || '/'

app.set('trust proxy', 1) // trust first proxy
app.use(helmet())

app.use(session({ cookie: { secure: false }, secret: process.env.SESSIONSECRET, resave: false, saveUninitialized: true, }))
// Inspired by:  https://github.com/manojap/node_examples/tree/master/flashMessage
app.use(flash())
app.use((req, res, next) => {res.locals.baseURL = baseURL; next()})
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

await configDB()

app.use('/', router)


// Error handling...
app.use((err, req, res, next) => {
    switch (err.status) {
        case 401:
            res.status(401).render('error', {msg: '401: Wrong credentials.'})
        case 404:
            res.status(404).render('error', {msg: '404 Not Found Sorry!'})
            break;
        case 403:
           res.status(403).render('error', {msg: '403 You do not own that resource.'})
            break
        default:
            res.status(505).render('error', {msg: '505 Internal server error.'})
            break;
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Application is up and running. Listening at port " + PORT)
})
