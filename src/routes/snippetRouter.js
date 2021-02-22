import express from 'express'
import { snippetController } from '../controllers/snippetController.js'
import Snippet from '../models/snippet.js'
export const router = express.Router()

router.get('/dashboard', restrictLoggedIn, (req, res, next) => {snippetController.renderDashboard(req, res, next)})
router.get('/create', restrictLoggedIn, (req, res, next) => {snippetController.createPage(req, res, next)})
router.post('/create', restrictLoggedIn, (req, res, next) => {snippetController.createSnippet(req, res, next)})
router.get('/:creator', async (req, res, next) => {})
router.get('/delete/:snippetID', (req, res, next) => {snippetController.deleteSnippet(req, res, next)})
router.post('/edit/:snippetID', (req, res, next) => {snippetController.editSnippet(req, res, next)})
router.get('/edit/:snippetID', (req, res, next) => {res.render('editSnippet', {user: req.session.userID, snippet: req.params.snippetID})})

function restrictLoggedIn(req, res, next) {
    if (req.session.userID) {
        next()
    } else {
        const error = new Error('Forbidden')
        error.statusCode = 403
        return next(error)
    }
}