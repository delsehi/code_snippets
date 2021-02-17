import mongoose from 'mongoose'


const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})


export const Account = mongoose.model('Account', accountSchema)