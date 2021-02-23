/**
 * A schema for user accounts.
 *
 * @author Delfi Šehidić <ds222qe@student.lnu.se>
 * @version 1.0.0
 */
import mongoose from 'mongoose'

const accountSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long.']
  }
}, {
  timestamps: true,
  versionKey: false
})

const Account = mongoose.model('Account', accountSchema)
export default Account
