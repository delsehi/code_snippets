import express from 'express'
import { accountRouter } from './accountRouter.js'

export const router = express.Router()

router.use('/account', accountRouter)

router.get('/', (req, res) => {
    res.render('index', { data: "No", snippets: ["yes", "no"] })
})


// router.post('/', (req, res) => {
//     console.log(req.body)
//     console.log('OK POST HERE')
//     res.send('HI')
// })

router.use('*', (req, res, next) => {
    res.send('ERROR')
})