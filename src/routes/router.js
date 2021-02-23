/**
 * General router.
 *
 * @author Delfi Šehidić <ds222qe@student.lnu.se>
 * @version 1.0.0
 */
import express from 'express'
import { snippetController } from '../controllers/snippetController.js'
import { accountRouter } from './accountRouter.js'
import { router as snippetRouter } from './snippetRouter.js'

export const router = express.Router()

// Set specific routes.
router.use('/account', accountRouter)

router.use('/snippet', snippetRouter)

router.get('/', async (req, res) => {
  res.render('index', { user: req.session.userID, snippets: await snippetController.getAllSnippets() })
})

router.use('*', (req, res, next) => {
  const error = new Error('Not found')
  next(error)
})
