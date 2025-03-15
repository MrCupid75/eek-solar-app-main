require('dotenv').config({ path: '../../.env' })
const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;

let db = null;
let client = null;

async function connectDB() {
    try {

        if (db) {
            return db;
        }

        client = new MongoClient(uri, {
            serverApi: ServerApiVersion.v1,
            tls: true,
            tlsAllowInvalidCertificates: true,
            connectTimeoutMS: 30000,
        }
        )

        await client.connect()
        console.log("DB connected")

        db = client.db(dbName)
        return db;

    } catch (error) {
        console.log(error)
    }
}

async function closeDB() {
    if (client) {
        await client.close();
        console.log("Database closed")

        client = null;
        db = null;
    }
}

module.exports = { connectDB, closeDB }