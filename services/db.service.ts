import mongoose from 'mongoose'

let connect: any

async function connectToMongoDB() {
  try {
    const dbUrl = process.env.MONGO_URL
    if (!dbUrl) {
      throw new Error('❌ MONGO_URL environment variable is not defined')
    }

    mongoose.set('strictQuery', true)

    connect = await mongoose.connect(dbUrl as string)

    console.log(`✅ Connected to MongoDB`)
  } catch (error: any) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`)
    throw error
  } finally {
    // const db = connect.connection.db
    // await db.collection('users').updateMany({}, { $unset: { __v: 1 } })
  }
}

export const dbService = { connectToMongoDB }
