import express from 'express'
import { snippetController } from '../controllers/snippetController.js'
export const router = express.Router()

router.get('/', (req, res, next) => {res.send('Get snippet.')})

router.post('/', restrictLoggedIn, (req, res, next) => {snippetController.createSnippet(req, res, next)})

function restrictLoggedIn(req, res, next) {
    if (req.session.userID) {
        next()
    } else {
        const error = new Error('Forbidden')
        error.statusCode = 403
        return next(error)
    }
}