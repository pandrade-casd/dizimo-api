const config = require('config')
const jwt = require('jsonwebtoken')
const expressValidation = require('express-validation');

function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
        next({ message: "Deu ruim, sem o token", status_code: 401 })
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWTSECRET)

            req.user = decoded
            next()
        } catch (error) {
            res.status(400).json({ msg: 'Token is not valid' })
        }
    }
}

module.exports = auth