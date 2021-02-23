import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Account from '../models/account.js'
import bcrypt from 'bcrypt'
dotenv.config/**
ddddddddddddd *
ddddddddddddd */
()

export class accountController {
  /**
   * @param req
   * @param res
   * @param next
   */
  static async login (req, res, next) {
    const username = req.body.username
    const password = req.body.password
    if (!username || !password) {
      req.flash('notify', 'Authentication failed.')
      res.redirect(process.env.BASE_URL + '/account/login')
      return
    }

    let hashFromDB
    Account.findOne({ username: username }).exec((err, user) => {
      if (!user || err) {
        req.flash('notify', 'Authentication failed.')
        res.redirect(process.env.BASE_URL + '/account/login')
        return
      }
      hashFromDB = user.password

      bcrypt.compare(password, hashFromDB).then((result) => {
        if (result) {
          req.session.regenerate(() => {
            req.session.userID = user._id
            res.redirect(process.env.BASE_URL + '/snippet/dashboard')
          })
        } else {
          req.flash('notify', 'Authentication failed.')
          res.redirect(process.env.BASE_URL + '/account/login')
        }
      })
    }
    )
  }

  /**
   * @param req
   * @param res
   * @param next
   */
  static async logout (req, res, next) {
    req.session.destroy()
    res.redirect(process.env.BASE_URL + '/')
  }

  /**
   * @param req
   * @param res
   * @param next
   */
  static async createAccount (req, res, next) {
    const newPassword = req.body.password
    const newUsername = req.body.username
    if (!newPassword || newPassword.length < 8) {
      req.flash('notify', 'Your password has to be at least 8 characters long.')
      res.redirect(process.env.BASE_URL + '/account/signup')
      return
    }
    if (!newUsername || newUsername.length < 4) {
      req.flash('notify', 'Your username has to be at least 4 characters long.')
      res.redirect(process.env.BASE_URL + '/account/signup')
      return
    }

    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        const newAccount = new Account({
          username: newUsername,
          password: hash
        })
        newAccount.save((err, ok) => {
          if (err) {
            req.flash('notify', 'Something went wrong. Maybe your username was already taken?')
            res.redirect(process.env.BASE_URL + '/account/signup')
          } else if (ok) {
            req.flash('notify', 'You have created an account. Now please log in!')
            res.redirect(process.env.BASE_URL + '/account/login')
          }
        })
      })
    })
  }

  /**
   * @param req
   * @param res
   * @param next
   */
  static async signup (req, res, next) {
    res.render('signup', { user: null })
  }
}
