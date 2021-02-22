import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Account from '../models/account.js'
import bcrypt from 'bcrypt'
dotenv.config()

export class accountController {
    static async login(req, res, next) {

        let username = req.body.username
        let password = req.body.password
        if (!username || !password) {
            req.flash('notify', 'Authentication failed.')
            res.redirect('/account/login')
            return
        }

        let hashFromDB
        Account.findOne({ username: username }).exec((err, user) => {
            hashFromDB = user.password

            bcrypt.compare(password, hashFromDB).then((result) => {
                if (result) {
                    req.session.regenerate(() => {
                        req.session.userID = user._id
                        res.redirect('/snippet/dashboard')

                    })
                } else {
                    req.flash('notify', 'Authentication failed.')
                    res.redirect('/account/login')
                    return
                }
            })

        }
        )
    }
    static async logout(req, res, next) {
        req.session.destroy()
        res.redirect('/')
    }

    static async createAccount(req, res, next) {
        let newPassword = req.body.password
        let newUsername = req.body.username
        if (!newPassword || newPassword.length < 8) {
            req.flash('notify', 'Your password has to be at least 8 characters long.')
            res.redirect('/account/signup')
            return
        }
        if (!newUsername || newUsername.length < 4) {
            req.flash('notify', 'Your username has to be at least 4 characters long.')
            res.redirect('/account/signup')
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
                        res.redirect('/account/signup')
                        return
                    } else if (ok) {
                        req.flash('notify', 'You have created an account. Now please log in!')
                        res.redirect('/account/login')
                    }
                })

            })
        })
        
    }
    static async signup(req, res, next) {
        res.render('signup', {user: null})
    }
}
