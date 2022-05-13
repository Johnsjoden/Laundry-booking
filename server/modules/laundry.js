const mongoose = require("mongoose")

const laundrySchema = mongoose.Schema({
    date: {require: true, type: String},
    day: {require: true, type: String},
    timestarted: {require: true, type: String},
    timeEnd: {require: true, type: String},
    booked: false,
    active: false
})
 
const Laundry = mongoose.model("Laundry", laundrySchema)

module.exports = {Laundry}