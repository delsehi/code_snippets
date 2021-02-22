import express from 'express'
import { snippetController } from '../controllers/snippetController.js'
export const router = express.Router()

router.get('/dashboard', restrictLoggedIn, (req, res, next) => {res.render('dashboard')})
router.get('/create', restrictLoggedIn, (req, res, next) => {snippetController.createPage(req, res, next)})
router.post('/create', restrictLoggedIn, (req, res, next) => {snippetController.createSnippet(req, res, next)})


function restrictLoggedIn(req, res, next) {
    if (req.session.userID) {
        next()
    } else {
        const error = new Error('Forbidden')
        error.statusCode = 403
        return next(error)
    }
}