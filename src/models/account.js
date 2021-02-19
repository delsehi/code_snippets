import mongoose from 'mongoose'


const accountSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const Account = mongoose.model('Account', accountSchema)
export default Account