import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Account from '../models/account.js'
import bcrypt from 'bcrypt'
dotenv.config()

export class accountController {
    static async login(req, res, next) {
        let username = req.body.username
        let password = req.body.password
        let hashFromDB
        Account.findOne({ username: username }).exec((err, user) => {
            hashFromDB = user.password

            bcrypt.compare(password, hashFromDB).then((result) => {
                if (result) {
                    req.session.regenerate(() => {
                        req.session.userID = user._id
                        req.session.success = `Authenticated as ${user.username}`
                        res.redirect('/snippet/dashboard')

                    })
                } else {
                    console.log('Authentication failed')
                    res.redirect('/account/login')
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

        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
                const newAccount = new Account({
                    username: newUsername,
                    password: hash
                })
                newAccount.save((err, ok) => {
                    ok ? console.log(ok) : console.log(err)
                })

            })
        })

        res.render('login', {msg: "You have created an account. Now log in!", })
    }
    static async signup(req, res, next) {
        res.render('signup', {msg: ""})
    }
}
