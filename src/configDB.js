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
