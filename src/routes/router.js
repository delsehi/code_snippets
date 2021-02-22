import express from 'express'
import { snippetController } from '../controllers/snippetController.js'
import { accountRouter } from './accountRouter.js'
import { router as snippetRouter} from './snippetRouter.js'

export const router = express.Router()

router.use('/account', accountRouter)

router.use('/snippet', snippetRouter)

router.get('/', async (req, res) => {
    res.render('index', {snippets: await snippetController.getAllSnippets()})
})


router.use('*', (req, res, next) => {
    res.send('ERROR')
})