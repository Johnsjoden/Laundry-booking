const jwt = require("jsonwebtoken")
const {User} = require("../modules/user")
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
exports.registerUser = async (req, res, next) => {
    const {password, username} = req.body
    if(password.length > 4 && username.length > 4){
        const user = new User({password, username})
        await user.save() 
        return user
    }else {
        return "error"
    }
}
exports.getUser = async (req, res, next) => {
    const filter = {id: req.user.userId}
    const user = await User.findOne(filter).populate("laundries")
    const twoHours = 7200000
    const currentDates = new Date().getTime() + twoHours
    user.laundries.map(item => {
        let bookingDate = new Date(`${item.date} ${item.timeEnd}`).getTime()
        if(bookingDate < currentDates){
            item.notActive = true
        }
    })
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
            expiresIn: "31 days",
            subject: user._id.toString()
        })
        return token
    }else {
        return "no user found"
    }
}