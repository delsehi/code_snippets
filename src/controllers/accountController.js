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
            console.log(user)
            hashFromDB = user.password

            bcrypt.compare(password, hashFromDB).then((result) => {
                if (result) {
                    req.session.regenerate(() => {
                        req.session.userID = user._id
                        req.session.success = `Authenticated as ${user.username}`
                        res.render("index")

                    })
                } else {
                    console.log('Authentication failed')
                 //   req.session.error = "Authentication failed."
                    res.redirect('/account/login')
                }
            })

        }
        )
    }

    static async createAccount(req, res, next) {
        let newPassword = req.body.password
        let newUsername = req.body.username

        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
                console.log("Hash is: " + hash)

                const newAccount = new Account({
                    username: newUsername,
                    password: hash
                })
                newAccount.save((err, ok) => {
                    ok ? console.log(ok) : console.log(err)
                })

            })
        })

        res.send('Alright, signed up!')
    }
    static async signup(req, res, next) {
        res.render('signup')
    }
}


function authenticate() {
    console.log('YEEES')
}