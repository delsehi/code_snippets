import { render } from 'ejs'
import Snippet from '../models/snippet.js'

export class snippetController {
    static async createSnippet(req, res, next) {
        const snippet = new Snippet({
            creatorID: req.session.userID,
            code: req.body.code
        })
        snippet.save()
        req.flash('notify', 'Snippet has been created!')
        res.redirect('/snippet/dashboard')
    }
    static createPage(req, res, next) {
        res.render('createSnippet', { user: req.session.userID })
    }
    static async getAllSnippets() {
        return await Snippet.find({})
    }
    static async getSnippetBy(userID) {
        return await Snippet.find({ creatorID: userID })
    }
    static async renderDashboard(req, res, next) {
        const userID = req.session.userID
        const userSnippets = await this.getSnippetBy(userID)
        res.render('dashboard', { user: userID, snippets: userSnippets })
    }
    static async deleteSnippet(req, res, next) {
        const snippetID = req.params.snippetID
        const snippet = await Snippet.findById(snippetID)
        const requesterID = req.session.userID
        if (requesterID === snippet.creatorID) {
            await Snippet.findByIdAndDelete(snippetID)
            res.redirect('/snippet/dashboard')
        }
        else {
            const error = new Error()
            error.status = 403
            next(error)
            // req.flash('notify', 'Hey, that is not your snippet!')
            // res.redirect('/snippet/dashboard')
            // return
        }
    }
    static async editSnippet(req, res, next) {
        const snippetID = req.params.snippetID
        const snippet = await Snippet.findById(snippetID)
        const requesterID = req.session.userID
        const newCode = req.body.code
        if (requesterID === snippet.creatorID) {
            snippet.code = newCode
            snippet.save()
            res.redirect('/snippet/dashboard')
        }
        else {
            const error = new Error()
            error.status = 403
            next(error)
        }
    }

}
