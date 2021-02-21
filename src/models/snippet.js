import mongoose from 'mongoose'


const schema = mongoose.Schema({
    creatorID: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    }
})

const Snippet = mongoose.model('Snippet', schema)
export default Snippet