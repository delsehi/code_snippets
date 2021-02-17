import express from 'express'
import dotenv from 'dotenv'
import { dirname, join} from 'path'
import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url'
import helmet from 'helmet'
import { router } from './routes/router.js'
//import session from 'express-session'
dotenv.config()

const app = express()
const __dirname = path.resolve();

app.use(helmet())


app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index', {data: "No", snippets: ["ok", "no"]})
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})