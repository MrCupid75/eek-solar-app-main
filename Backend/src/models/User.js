const { Collection } = require('mongodb');
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

async function loginUser(email, password) {
    try {

        const db = await connectDB();
        const collection = db.collection(collectionName);

        const user = await collection.findOne({ email })

        if (!user) {
            throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            throw new Error("Invalid Credentials");
        }

        return user;

    } catch (error) {
        throw new Error("Error:", error);
    }
}

async function allUsers() {
    try {
        const db = await connectDB();
        const collection = db.collection(collectionName);

        const users = await collection.find().toArray();

        return users
    } catch (error) {
        throw new Error("Error: ", error);

    }
}

async function getUserbyEmail(email) {
    try {
        const db = connectDB();
        const collection = db.collection(collectionName);

        const user = await collection.findOne({ email })

        if (!user) {
            throw new Error("User not found");
        }

        return user;

    } catch (error) {
        throw new Error("Server error");

    }
}

async function updateUser(email, updatedData) {
    try {
        const db = connectDB();
        const collection = db.collection(collectionName);

        const user = collection.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        if (updatedData.password) {
            const saltRounds = 10;
            updatedData.password = await bcrypt.hash(updatedData.password, saltRounds)
        }

        const result = await collection.updateOne(
            { email: email },
            { $set: updatedData }
        );


    } catch (error) {
        throw new Error("Server error");

    }
}

async function deleteUser(email) {
    try {

        const db = connectDB();
        const collection = db.collection(collectionName);

        const user = await collection.findOne({ email })

        if (!user) throw new Error("User not found");

        const result = collection.deleteOne({ email });

    } catch (error) {
        throw new Error("Error deleting user", error);

    }
}

module.exports = { registerUser, allUsers, getUserbyEmail, updateUser, deleteUser }