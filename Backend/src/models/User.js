const { connectDB } = require('../config/db.js')
const bcrypt = require('bcrypt')

const collectionName = 'users'

async function registerUser(name, email, password) {
    try {
        const db = await connectDB();
        const collection = db.collection(collectionName);
        const existingUser = await collection.findOne({ email })

        if (existingUser) {
            throw new Error("User already exist");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = { name, email, password: hashedPassword, createdAt: new Date(), }
        const result = await collection.insertOne(newUser)
        return result
    } catch (error) {
        throw new Error("Error:", error);

    }
}

module.exports = { registerUser }