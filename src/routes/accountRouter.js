import express from 'express'
import { accountController } from '../controllers/accountController.js'

export const accountRouter = express.Router()

accountRouter.post('/login', (req, res, next) => { accountController.login(req, res, next) })

accountRouter.post('/signup', (req, res, next) => accountController.createAccount(req, res, next))

accountRouter.get('/signup', (req, res, next) => {
  accountController.signup(req, res, next)
})
accountRouter.get('/logout', restrictLoggedIn, (req, res, next) => { accountController.logout(req, res, next) })

accountRouter.get('/login', (req, res, next) => { res.render('login', { user: req.session.userID }) })

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
