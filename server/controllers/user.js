const jwt = require("jsonwebtoken")
const {User} = require("../modules/user")
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
exports.registerUser = async (req, res, next) => {
    const {password, username} = req.body
    const user = new User({password, username})
    await user.save()
    return user
}
exports.loginUser = async (req, res, next) => {
    const {username, password} = req.body
    const user = await User.login(username, password) 
    if(user){
        const token = jwt.sign({
            userId: user._id.toString(),
            username: user.username
        }, 
        JWT_SECRET, {
            expiresIn: "24h",
            subject: user._id.toString()
        })
        return token
    }else {
        return "no user found"
    }
}