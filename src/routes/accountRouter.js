import express from 'express'
import { accountController } from '../controllers/accountController.js'


export const accountRouter = express.Router()

accountRouter.post('/signup', (req, res, next) => {

    accountController.createAccount(req.body.username, req.body.password)
    res.send("You've created an account. ")

})

accountRouter.get('/signup', (req, res, next) => {
    accountController.signup(req, res, next)
})

accountRouter.get('/', (req, res, next) => {
    res.send('Yes')
})