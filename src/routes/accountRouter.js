import express from 'express'
import { accountController } from '../controllers/accountController.js'


export const router = express.Router()


const controller = new accountController()

