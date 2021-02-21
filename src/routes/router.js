import express from 'express'
import { accountRouter } from './accountRouter.js'
import { router as snippetRouter} from './snippetRouter.js'

export const router = express.Router()

router.use('/account', accountRouter)

router.use('/snippet', snippetRouter)

router.get('/', (req, res) => {
    res.render('index', { data: "No", snippets: ["yes", "no"] })
})


router.use('*', (req, res, next) => {
    res.send('ERROR')
})