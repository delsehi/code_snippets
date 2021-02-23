/**
 * A schema for snippets.
 *
 * @author Delfi Šehidić <ds222qe@student.lnu.se>
 * @version 1.0.0
 */
import mongoose from 'mongoose'

const schema = mongoose.Schema({
  creatorID: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Snippet = mongoose.model('Snippet', schema)
export default Snippet
