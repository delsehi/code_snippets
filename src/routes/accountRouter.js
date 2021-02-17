import express from 'express'
import { accountController } from '../controllers/accountController.js'


export const router = express.Router()


accountController.createAccount('hello', 'there')