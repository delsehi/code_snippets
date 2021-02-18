import express from 'express'
import { accountController } from '../controllers/accountController.js'


export const accountRouter = express.Router()


accountRouter.post('/new', (req, res, next) => {
    console.log('hej')
    res.send('WORKING')
    res.render('index', {data: "WORKING"})
})

accountRouter.get('/', (req, res, next) => {
    res.send('Yes.')
})