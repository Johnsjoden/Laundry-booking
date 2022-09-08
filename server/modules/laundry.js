const mongoose = require("mongoose")

const laundrySchema = mongoose.Schema({
    id: {require: true, type: String},
    date: {require: true, type: String},
    day: {require: true, type: String},
    week: {type: Number},
    timeStarted: {require: true, type: String},
    timeEnd: {require: true, type: String},
    booked: false,
    notActive: false
})
laundrySchema.statics.saveOne = async function (body, userId){
    const laundry = await Laundry.findOne({id: body.id})
    if(laundry){
        return `already booked ${laundry.id}`
    }else {
        body.booked = true
        const newLaundry = await new Laundry(body)
        newLaundry.save()
        return newLaundry
    }
}
const Laundry = mongoose.model("Laundry", laundrySchema)



module.exports = {Laundry}