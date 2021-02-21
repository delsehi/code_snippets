import Snippet from '../models/snippet.js'

export class snippetController {
    static async createSnippet(req, res, next) {
        console.log(req.session)
        const snippet = new Snippet({
            creatorID: req.session.userID,
            code: req.body.code
        })
        snippet.save()
    }
    static createPage(req, res, next) {
        res.render('createSnippet')
    }
}

