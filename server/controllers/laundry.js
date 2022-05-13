const {Laundry} = require("../modules/laundry");
const array = []
const getDate = (year, month, day) => {
    return `${year}:${month}:${day}`
}
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
for (let index = 0; index < 7; index++) {
    array.push({
        date: getDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate() + index),
        day: dayNames[new Date().getDay() + index],
        timestarted: "19:00",
        timeEnd: "22:00",
        booked: false
    })
}

array.forEach( async (item) => {

    /* const newLaundry = await new Laundry(item)
    newLaundry.save() */
}) 
exports.getLaundry = (query) => {
     const array = []
const getDate = (year, month, day) => {
    return `${year}:${month}:${day}`
}
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let index = 0; index < 7; index++) {
    array.push({
        date: getDate(query.date + index),
        day: dayNames[new Date().getDay() + index],
        timestarted: "19:00",
        timeEnd: "22:00",
        booked: false
    })
}
return array
}