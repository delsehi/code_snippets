import Snippet from '../models/snippet.js'

/**
 * A controller for managing snippets.
 */
export class snippetController {
  /**
   * Method for creating a snippet.
   *
   * @param {Request} req The request.
   * @param {Response} res The response.
   * @param {next} next Next middleware.
   */
  static async createSnippet (req, res, next) {
    const snippet = new Snippet({
      creatorID: req.session.userID,
      code: req.body.code
    })
    snippet.save()
    req.flash('notify', 'Snippet has been created!')
    res.redirect(process.env.BASE_URL + '/snippet/dashboard')
  }

  /**
   * Method for rendering page for creating snippet.
   *
   * @param {Request} req The request.
   * @param {Response} res The response.
   * @param {next} next Next middleware.
   */
  static createPage (req, res, next) {
    res.render('createSnippet', { user: req.session.userID })
  }

  /**
   * Method for getting all snippets in the database.
   *
   * @returns {Document<any>} the result.
   */
  static async getAllSnippets () {
    return await Snippet.find({})
  }

  /**
   * Method for getting snippet by certain user.
   *
   * @param {number} userID The user id
   * @returns {Document<any>} the result.
   */
  static async getSnippetBy (userID) {
    return await Snippet.find({ creatorID: userID })
  }

  /**
   * Method for rendering dashboard.
   *
   * @param {Request} req The request.
   * @param {Response} res The response.
   * @param {next} next Next middleware.
   */
  static async renderDashboard (req, res, next) {
    const userID = req.session.userID
    const userSnippets = await this.getSnippetBy(userID)
    res.render('dashboard', { user: userID, snippets: userSnippets })
  }

  /**
   * Method for deleting a certain snippet.
   *
   * @param {Request} req The request.
   * @param {Response} res The response.
   * @param {next} next Next middleware.
   */
  static async deleteSnippet (req, res, next) {
    const snippetID = req.params.snippetID
    const snippet = await Snippet.findById(snippetID)
    const requesterID = req.session.userID
    if (requesterID === snippet.creatorID) {
      await Snippet.findByIdAndDelete(snippetID)
      res.redirect(process.env.BASE_URL + '/snippet/dashboard')
    } else {
      const error = new Error()
      error.status = 403
      next(error)
    }
  }

  /**
   * Method for editing a certain snippet.
   *
   * @param {Request} req The request.
   * @param {Response} res The response.
   * @param {next} next Next middleware.
   */
  static async editSnippet (req, res, next) {
    const snippetID = req.params.snippetID
    const snippet = await Snippet.findById(snippetID)
    const requesterID = req.session.userID
    const newCode = req.body.code
    if (requesterID === snippet.creatorID) {
      snippet.code = newCode
      snippet.save()
      res.redirect(process.env.BASE_URL + '/snippet/dashboard')
    } else {
      const error = new Error()
      error.status = 403
      next(error)
    }
  }
}
