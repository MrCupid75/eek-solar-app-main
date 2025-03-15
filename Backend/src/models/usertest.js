require('dotenv').config()
const { registerUser, loginUser } = require('./User.js')


async function testRegister() {
    try {
        const result = await registerUser("Joe", "m@gmail.com", "sfbsdiuf");
        console.log(result)
    } catch (error) {
        console.error("Error in user registration", error.message)
    }
}

async function testLogin() {
    try {
        const result = await loginUser("m@gmail.com", "sfbsdiuf");
        console.log(result)
    } catch (error) {
        console.error("Error in login:", error)
    }
}

testLogin()