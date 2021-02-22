import { render } from 'ejs'
import Snippet from '../models/snippet.js'

export class snippetController {
    static async createSnippet(req, res, next) {
        console.log(req.session)
        const snippet = new Snippet({
            creatorID: req.session.userID,
            code: req.body.code
        })
        snippet.save()
        res.redirect('/snippet/dashboard')
    }
    static createPage(req, res, next) {
        res.render('createSnippet', {msg: ""})
    }
    static async getAllSnippets() {
        return await Snippet.find({})
    }
    static async getSnippetBy(userID) {
        return await Snippet.find({creatorID: userID})
    }
    static async renderDashboard(req, res, next) {
        const userID = req.session.userID
        const userSnippets = await this.getSnippetBy(userID)
        res.render('dashboard', {msg: "", snippets: userSnippets} )
    }
    static async deleteSnippet(req, res, next) {
        const snippetID = req.params.snippetID
        console.log("Snippet id is " + snippetID)
        await Snippet.findByIdAndDelete(snippetID)
        res.redirect('/snippet/dashboard')
    }
    static async isOwnerOfSnippet() {

    }
}
