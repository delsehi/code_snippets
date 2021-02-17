import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Account } from '../models/account.js'
dotenv.config()


export class accountController {
    static async createAccount(username, password) {
        console.log(username, password)
    }
}