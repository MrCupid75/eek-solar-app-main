require('dotenv').config()
const { registerUser } = require('./User.js')


async function testRegister() {
    try {
        const result = await registerUser("Joe", "m@gmail.com", "sfbsdiuf");
        console.log(result)
    } catch (error) {
        console.error("Error in user registration", error.message)
    }
}

testRegister();