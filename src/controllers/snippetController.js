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
        res.render('createSnippet')
    }
    static async getAllSnippets() {
        let a = await Snippet.find({})
        console.log(a)
        return a

    }
}
