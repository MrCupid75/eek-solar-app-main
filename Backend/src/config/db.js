require('dotenv').config({ path: '../../.env' })
const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;
console.log(dbName)

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

async function connectDB() {
    try {
        await client.connect()
        console.log("DB connected")

        const db = client.db(dbName)

        const collection = db.collection("users")

        const documents = await collection.find({}).toArray()

        console.log(documents)

    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}

connectDB()