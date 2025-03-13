const { connectDB, closeDB } = require('./db.js')
require('dotenv').config({ path: '../../.env' })

async function testConnection() {
    try {
        const db = await connectDB();
        console.log("Database connection successful");

        const collections = await db.listCollections().toArray();
        console.log(collections);

    } catch (error) {
        console.log(error);
    } finally {
        await closeDB();
        console.log("DB Closed")
    }

}

testConnection()