import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Account } from '../models/account.js'
dotenv.config()


export class accountController {
    static async createAccount(newUsername, newPassword) {
        const newAccount = new Account({
            username: newUsername, 
            password: newPassword
        })
        await newAccount.save()
    }
}