/**
 * A simple configuration file that sets up a connection to the database.
 *
 * @author Delfi Šehidić <ds222qe@student.lnu.se>
 * @version 1.0.0
 */
import mongoose from 'mongoose'

/**
 * Connects to the database.
 */
export default async function connectDB () {
  mongoose.connect(process.env.DB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
}
