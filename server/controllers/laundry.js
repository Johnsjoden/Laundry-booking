const {Laundry} = require("../modules/laundry");
const {User} = require("../modules/user");
const mongoose = require("mongoose")
exports.bookLaundry = async (laundryId, userId) => {
    const bookLaundry = await Laundry.findOneAndUpdate({_id: laundryId}, {booked: true})
    laundryId = mongoose.Types.ObjectId(laundryId)
    const addLaundryToUser = await User.findOneAndUpdate({_id: userId}, {$addToSet: {laundries: laundryId}})
    return bookLaundry
}
exports.createLaundry = async (query) => {
Date.prototype.addDays = function (days, query) {
    let date = new Date();
    if(date.getDay() === 0){
        date.setDate(date.getDate() - date.getDay() - 6 + days);
    }else {
      date.setDate(date.getDate() - date.getDay() + 1 + days);  
    }
    date = date.toLocaleString('en-GB', {timeZone: 'Europe/Stockholm'});
    date = date.split(",")[0]
    date = date.replace(new RegExp(/\//g), "-")
    return date;
};
const date = new Date();
const getDay = (index) => {
       let indexNumber = index / 7
       let substractNumber = Math.floor(indexNumber)
       indexNumber = Math.round(indexNumber * 100) / 100
       indexNumber = indexNumber.toFixed(2) - substractNumber
       indexNumber = indexNumber.toFixed(2)
       let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']
       if(indexNumber == "0.00"){
        return dayNames[1]
       }else if(indexNumber == "0.14"){
           return dayNames[2]
       }else if(indexNumber == "0.29"){
        return dayNames[3]
        }else if(indexNumber == "0.43"){
            return dayNames[4]
        }else if(indexNumber == "0.57"){
            return dayNames[5]
        }else if(indexNumber == "0.71"){
            return dayNames[6]
        }else if(indexNumber == "0.86"){
            return dayNames[7]
        }
}
    for (let index = 0; index < 42; index++) {
        const createLaundry = await new Laundry({
            id: index,
            date: date.addDays(index, query),
            day: getDay(index),
            timeStarted: "19:00",
            timeEnd: "22:00",
            booked: false
        })
        createLaundry.save()
    }
}
exports.getAllLaundries = async (query) => {
    const laundries = await Laundry.find().sort({id: 1})
    return laundries
}