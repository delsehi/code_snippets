import express from 'express'
import { accountController } from '../controllers/accountController.js'


export const accountRouter = express.Router()

accountRouter.post('/login', (req, res, next) => { accountController.login(req, res, next) })

accountRouter.post('/signup', (req, res, next) => accountController.createAccount(req, res, next))

accountRouter.get('/signup', (req, res, next) => {
    accountController.signup(req, res, next)
})
accountRouter.get('/logout', (req, res, next) => { accountController.logout(req, res, next)})

accountRouter.get('/login', (req, res, next) => { res.render('login', {msg: ""}) })