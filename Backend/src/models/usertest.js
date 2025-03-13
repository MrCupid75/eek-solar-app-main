const { registerUser } = require('./User.js')

async function testRegister() {
    try {
        const result = await registerUser("Joe", "mj@gmail.com", "sfbsdiuf");
        console.log(result)
    } catch (error) {
        throw new Error(error);

    }
}

testRegister();