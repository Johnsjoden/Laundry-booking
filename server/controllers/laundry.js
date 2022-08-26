const {Laundry} = require("../modules/laundry");
const {User} = require("../modules/user");
const mongoose = require("mongoose")
exports.bookLaundry = async (body, userId) => {
    const bookLaundry = await Laundry.saveOne(body, userId)
    const addLaundryToUser = await User.findOneAndUpdate({_id: userId}, {$addToSet: {laundries: bookLaundry._id}})
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
    date = date.toLocaleDateString()
    /* date = date.replace(new RegExp(/\//g), "-") */
    return date;
};
const getWeekNumber = (days) => {
    currentDate = new Date();
    if(currentDate.getDay() === 0){
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() - 6 + days);
    }else {
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + days);  
    }
    startDate = new Date(currentDate.getFullYear(), 0, 1);
    var dayy = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil(dayy / 7);
    return weekNumber
}
const date = new Date();
const getDay = (index) => {
       let dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']
       const getIndexDay = index % 7
       return dayNames[getIndexDay]
}
let array = []
    for (let index = 0; index < 42; index++) {
        array.push({
            id: date.addDays(index, query) + "/19:00-22:00",
            date: date.addDays(index, query),
            week: getWeekNumber(index),
            day: getDay(index),
            timeStarted: "19:00",
            timeEnd: "22:00",
            booked: false,
            notActive: false
        })
    }
    const twoHours = 7200000
    const currentDates = new Date().getTime() + twoHours
    const laundries = await Laundry.find()
    array.map(item => {
        let bookingDate = new Date(`${item.date} ${item.timeEnd}`).getTime()
        if(bookingDate < currentDates){
            item.notActive = true
        }
    })
    laundries.map(item => {
        array.map(data => {
            if(item.id === data.id){
                data.booked = true
            }
        })
    })
    return array
}
exports.getAllLaundries = async (query) => {
    const laundries = await Laundry.find().sort({id: 1})
    const twoHours = 7200000
    const currentDate = new Date().getTime() + twoHours
    laundries.map(item => {
        let bookingDate = new Date(item.date).getTime()
        if(bookingDate < currentDate){
            item.notActive = true
        }
    })
    return laundries
}
exports.unbookLaundry = async (req, res, next) => {
    console.log(req.params.id)
    const filter = {
        _id: req.params.id
    }
    const deleteLaundry = await Laundry.deleteOne(filter)
    const remove_idFromUser = await User.findOneAndUpdate({_id: req.user.userId}, {$pull: {laundries: req.params.id}})
    return "unbooked"
}
exports.getWeekNumber = async (req, res, next) => {
    const getWeekNumber = (days) => {
        currentDate = new Date();
        if(currentDate.getDay() === 0){
            currentDate.setDate(currentDate.getDate() - currentDate.getDay() - 6 + days);
        }else {
            currentDate.setDate(currentDate.getDate() - currentDate.getDay() + days);  
        }
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        var dayy = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));
        var weekNumber = Math.ceil(dayy / 7);
        return weekNumber
    }
    array = []
    for (let index = 0; index < 4; index++){
        array.push({
            weekNumber: getWeekNumber(index * 7)
        })
    }
    return array
}