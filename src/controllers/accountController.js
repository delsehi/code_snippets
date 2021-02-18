import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Account from '../models/account.js'
import bcrypt from 'bcrypt'
dotenv.config()

export class accountController {
    static async createAccount(newUsername, newPassword) {

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
    }
    static async signup(req, res, next) {
        res.render('signup')
    }
}

