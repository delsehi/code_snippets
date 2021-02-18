import express from 'express'
import { accountController } from '../controllers/accountController.js'


export const accountRouter = express.Router()

accountRouter.post('/signup', (req, res, next) => {
    console.log(req.body)
    accountController.createAccount(req.body.username, req.body.password)
    res.send("Hello there")

})

accountRouter.get('/', (req, res, next) => {
    
})