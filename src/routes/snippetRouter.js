import express from 'express'
import { snippetController } from '../controllers/snippetController.js'
export const router = express.Router()

router.get('/dashboard', restrictLoggedIn, (req, res, next) => { snippetController.renderDashboard(req, res, next) })
router.get('/create', restrictLoggedIn, (req, res, next) => { snippetController.createPage(req, res, next) })
router.post('/create', restrictLoggedIn, (req, res, next) => { snippetController.createSnippet(req, res, next) })
router.get('/delete/:snippetID', restrictLoggedIn, (req, res, next) => { snippetController.deleteSnippet(req, res, next) })
router.post('/edit/:snippetID', restrictLoggedIn, (req, res, next) => { snippetController.editSnippet(req, res, next) })
router.get('/edit/:snippetID', restrictLoggedIn, (req, res, next) => { res.render('editSnippet', { user: req.session.userID, snippet: req.params.snippetID }) })
/**
 * Middleware that restricts anonymous users from accessing content.
 *
 * @param {Request} req The request.
 * @param {Response} res The response.
 * @param {next} next Next middleware.
 */
function restrictLoggedIn (req, res, next) {
  if (req.session.userID) {
    next()
  } else {
    const error = new Error()
    error.status = 404
    next(error)
  }
}
