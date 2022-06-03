const {Laundry} = require("../modules/laundry");
exports.bookLaundry = async (id, body) => {
    const bookLaundry = await Laundry.saveOne(id, body)
    return bookLaundry
}
exports.getLaundry = async (query) => {
     const array = []
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
    /* currentdate = new Date(query.date);
    var oneJan = new Date(currentdate.getFullYear(),0,1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7); */
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
    const laundry = await Laundry.find().select({_id: 0, __v: 0})
    /* {id: 1, date: 1, day: 1, timeStarted: 1, timeEnd: 1, booked: 1} */
    for (let index = 0; index < 42; index++) {
        array.push({
        id: date.addDays(index, query) + "-19:00-22:00",
        date: date.addDays(index, query),
        day: getDay(index),
        timeStarted: "19:00",
        timeEnd: "22:00",
        booked: false
    })
    /* array.filter(item => {
        console.log(laundry.includes(item))
    }) */

    /* var arr1 = [1,2,3,4],
    arr2 = [2,4],
    res = array.filter(item => {
        console.log(laundry.includes(item))
    }); */
    const booked = (item) => {
        if(item.booked === true){
            return item
        }else {
            return item
        }
    }
    arrayTwo = []
    result = array.filter(item => {
        laundry.forEach(({id}) => {
            if(item.id === id){
                item.booked = true
                arrayTwo.push(item)
            }
            else {
                arrayTwo.push(item)
            }
        })
    })
    
    /* console.log(array.includes("30-05-2022-19:00-22:00")); */
}
return arrayTwo
}