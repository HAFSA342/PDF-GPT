const jsonwebtoken = require("jsonwebtoken")

const generateJWT = (payload) => {
    const token = jsonwebtoken.sign(
        { payload },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
    )
    return token
}

module.exports = {
    generateJWT
}