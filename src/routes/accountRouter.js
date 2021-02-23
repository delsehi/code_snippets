import express from 'express'
import { accountController } from '../controllers/accountController.js'

export const accountRouter = express.Router()

accountRouter.post('/login', (req, res, next) => { accountController.login(req, res, next) })

accountRouter.post('/signup', (req, res, next) => accountController.createAccount(req, res, next))

accountRouter.get('/signup', (req, res, next) => {
  accountController.signup(req, res, next)
})
accountRouter.get('/logout', restrictLoggedIn, (req, res, next) => { accountController.logout(req, res, next) })

accountRouter.get/**
aaaaaaaaaaaaaaaaa * @param req
aaaaaaaaaaaaaaaaa * @param res
aaaaaaaaaaaaaaaaa * @param next
aaaaaaaaaaaaaaaaa * @param req
aaaaaaaaaaaaaaaaa * @param res
aaaaaaaaaaaaaaaaa * @param next
aaaaaaaaaaaaaaaaa * @param req
aaaaaaaaaaaaaaaaa * @param res
aaaaaaaaaaaaaaaaa * @param next
aaaaaaaaaaaaaaaaa * @param req
aaaaaaaaaaaaaaaaa * @param res
aaaaaaaaaaaaaaaaa * @param next
aaaaaaaaaaaaaaaaa * @param req
aaaaaaaaaaaaaaaaa * @param res
aaaaaaaaaaaaaaaaa * @param next
aaaaaaaaaaaaaaaaa * @param req
aaaaaaaaaaaaaaaaa * @param res
aaaaaaaaaaaaaaaaa * @param next
aaaaaaaaaaaaaaaaa * @param req
aaaaaaaaaaaaaaaaa * @param res
aaaaaaaaaaaaaaaaa * @param next
aaaaaaaaaaaaaaaaa * @param req
aaaaaaaaaaaaaaaaa * @param res
aaaaaaaaaaaaaaaaa * @param next
aaaaaaaaaaaaaaaaa * @param req
aaaaaaaaaaaaaaaaa * @param res
aaaaaaaaaaaaaaaaa * @param next
aaaaaaaaaaaaaaaaa * @param req
aaaaaaaaaaaaaaaaa * @param res
aaaaaaaaaaaaaaaaa * @param next
aaaaaaaaaaaaaaaaa */
('/login', (req, res, next) => { res.render('login', { user: req.session.userID }) })

function restrictLoggedIn (req, res, next) {
  if (req.session.userID) {
    next()
  } else {
    const error = new Error()
    error.status = 404
    next(error)
  }
}
