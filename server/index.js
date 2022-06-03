const express = require("express")
const cors = require("cors")
const {user} = require("./routes/user")
const {laundry} = require("./routes/laundry")
const app = express()
const mongoose = require("mongoose")
const {auth} = require("./controllers/auth")
require("dotenv").config()
app.use(cors())
mongoose.connect("mongodb://localhost:27017/laundry")
const PORT = process.env.PORT
const getDay = (day) => {
    console.log(day)
    if(day === 1 || day === 8){
        console.log(day)
        return "Monday"
    } else if (day === 2 || day === 9){
        return "Tuesday"
    }
    else if (day === 3 || day === 10){
        return "Wednesday"
    }
    else if (day === 4 || day === 11){
        return "Thursday"
    }
    else if (day === 5 || day === 12){
        return "Friday"
    }
    else if (day === 6 || day === 13){
        return "Saturday"
    }else if (day === 7 || day === 14){
        return "Sunday"
    }
}
/* ,
    [{
        day: getDay(new Date().getDay()),
        timestarted: "16:00",
        timeEnd: "19:00",
        booked: false
    }],
    [{
        day: getDay(new Date().getDay()),
        timestarted: "13:00",
        timeEnd: "16:00",
        booked: false
    }],
    [{
        day: getDay(new Date().getDay()),
        timestarted: "10:00",
        timeEnd: "13:00",
        booked: false
    }]) */
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(auth)
app.use("/user", user)
app.use("/laundry", laundry)
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
})