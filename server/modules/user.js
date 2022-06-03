const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const {Laundry} = require("./laundry")
const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true, minlength: 4},
    password: {type: String, required: true, minlength: 4},
    laundries: {type: [mongoose.Schema.Types.ObjectId], ref: "Laundry" }
})
userSchema.pre("save", async function (next){
    let user = this
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    next()
})
userSchema.statics.login = async function (username, password){
    const filter = {
        username: username
    }
    const user = await User.findOne(filter)
    if(await bcrypt.compare(password, user.password)){
        return user
    }else {
        return null
    }
}
const User = mongoose.model("User", userSchema)
module.exports = {User}