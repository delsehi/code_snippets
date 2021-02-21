export class snippetController {
    static async createSnippet(req, res, next) {
        console.log(req.session)
        res.send('Ok your cookie is ' + req.session.userID)
    }
}