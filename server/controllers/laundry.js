const { Laundry } = require("../modules/laundry");
const { User } = require("../modules/user");
const mongoose = require("mongoose")
exports.bookLaundry = async (body, userId) => {
    console.log(body)
    const bookLaundry = await Laundry.saveOne(body, userId)
    const addLaundryToUser = await User.findOneAndUpdate({ _id: userId }, { $addToSet: { laundries: bookLaundry._id } })
    return bookLaundry
}
exports.createLaundry = async (query) => {

    Date.prototype.addDays = function (days, query) {
        let date = new Date();

        if (date.getDay() === 0) {
            date.setDate(date.getDate() - date.getDay() - 6 + days);
        } else {
            date.setDate(date.getDate() - date.getDay() + 1 + days);
        }
        date = date.toLocaleDateString()
        /* date = date.replace(new RegExp(/\//g), "-") */
        return date;
    };
    const getWeekNumber = (days) => {
        currentDate = new Date();
        if (currentDate.getDay() === 0) {
            currentDate.setDate(currentDate.getDate() - currentDate.getDay() - 6 + days);
        } else {
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
        
        let dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        // why i have to make a statement is because when i use Math.abs when its negative, it makes it goes backwards instead of 0-6 it goes 6-0 
        if(index < 0){
            let dayNamess = ['Monday', 'Sunday', 'Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday']
            return dayNamess[Math.abs(index) % 7]
        }
        const getIndexDay = Math.abs(index) % 7
        return dayNames[getIndexDay]
    }
    let array = []
    let addWeek = parseInt(query.week)
    for (let index = addWeek; index < 7 + addWeek; index++) {
        array.push({
            date: date.addDays(index, query),
            bookingTimes: [
                {
                    date: date.addDays(index, query),
                    id: date.addDays(index, query) + "/07:00-10:00",
                    timeStarted: "07:00",
                    timeEnd: "10:00",
                    booked: false,
                    notActive: false
                },
                {
                    date: date.addDays(index, query),
                    id: date.addDays(index, query) + "/10:00-13:00",
                    timeStarted: "10:00",
                    timeEnd: "13:00",
                    booked: false,
                    notActive: false
                },
                {   
                    date: date.addDays(index, query),
                    id: date.addDays(index, query) + "/13:00-16:00",
                    timeStarted: "13:00",
                    timeEnd: "16:00",
                    booked: false,
                    notActive: false
                },
                {   
                    date: date.addDays(index, query),
                    id: date.addDays(index, query) + "/16:00-19:00",
                    timeStarted: "16:00",
                    timeEnd: "19:00",
                    booked: false,
                    notActive: false
                },
                {   
                    date: date.addDays(index, query),
                    id: date.addDays(index, query) + "/19:00-22:00",
                    timeStarted: "19:00",
                    timeEnd: "22:00",
                    booked: false,
                    notActive: false
                },
            ],
            week: getWeekNumber(index),
            day: getDay(index)
        })
    }
    const twoHours = 7200000
    const currentTime = new Date().getTime() + twoHours
    const laundries = await Laundry.find()
    array.map(e => {
        e.bookingTimes.forEach(item => {
            let bookingDate = new Date(`${item.date} ${item.timeEnd}`).getTime()
            let fourtyTwoDays = new Date()
            fourtyTwoDays = fourtyTwoDays.setDate(fourtyTwoDays.getDate() + 42)
            if (bookingDate < currentTime || bookingDate > fourtyTwoDays) {
                item.notActive = true
            }
        })
        /* let bookingDate = new Date(`${item.date} ${item.timeEnd}`).getTime()
        if (bookingDate < currentDates) {
            item.notActive = true
        } */
    })
    laundries.map(item => {
        array.map(data => {
            data.bookingTimes.map(items => {
                if (items.id === item.id) {
                    items.booked = true
                }
            })
        })
    })
    /* if(Object.keys(query).length != 0){
        array = array.filter(item => {
            return item.week.toString() === query.week
        })
    } */
    return array
}
exports.getAllLaundries = async (query) => {
    const laundries = await Laundry.find().sort({ id: 1 })
    const twoHours = 7200000
    const currentDate = new Date().getTime() + twoHours
    laundries.map(item => {
        let bookingDate = new Date(item.date).getTime()
        if (bookingDate < currentDate) {
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
    const remove_idFromUser = await User.findOneAndUpdate({ _id: req.user.userId }, { $pull: { laundries: req.params.id } })
    return "unbooked"
}
exports.getWeekNumber = async (req, res, next) => {
    const getWeekNumber = (days) => {
        currentDate = new Date();
        if (currentDate.getDay() === 0) {
            currentDate.setDate(currentDate.getDate() - currentDate.getDay() - 6 + days);
        } else {
            currentDate.setDate(currentDate.getDate() - currentDate.getDay() + days);
        }
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        var dayy = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));
        var weekNumber = Math.ceil(dayy / 7);
        return weekNumber
    }
    array = []
    for (let index = 0; index < 4; index++) {
        array.push({
            weekNumber: getWeekNumber(index * 7)
        })
    }
    return array
}