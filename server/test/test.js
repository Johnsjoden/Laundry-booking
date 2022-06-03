const assert = require("assert")
const { isTypedArray } = require("util/types")


describe("testing array", function (){
    describe("getting right number", function (){

            const array = []
            Date.prototype.addDays = function (days) {
                let date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                date = date.toLocaleString('en-GB', {timeZone: 'Europe/Stockholm'});
                return date;
            };  
            const date = new Date();
            const somefunction = (index) => {
                   let numberTwo = index / 7
                   let numberFour = Math.floor(numberTwo)
                   numberTwo = Math.round(numberTwo * 100) / 100
                   let finalNumber = numberTwo.toFixed(2) - numberFour
                   finalNumber = finalNumber.toFixed(2)
                   let stringFinal = `` + finalNumber
                   var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                   if(stringFinal == "0.00"){
                    return dayNames[new Date().getDay() + 0]
                   }else if(stringFinal == "0.14"){
                       return dayNames[new Date().getDay() + 1]
                   }else if(stringFinal == "0.29"){
                    return dayNames[new Date().getDay() + 2]
                    }else if(stringFinal == "0.43"){
                        return dayNames[new Date().getDay() + 3]
                    }else if(stringFinal == "0.57"){
                        return dayNames[new Date().getDay() + 4]
                    }else if(stringFinal == "0.71"){
                        return dayNames[new Date().getDay() + 5]
                    }else if(stringFinal == "0.86"){
                        return dayNames[new Date().getDay() + 6]
                    }else {
                        console.log("WRONG")
                    }
            }

                for (let index = 0; index < 20; index++) {
                    array.push({
                    date: date.addDays(index),
                    day: somefunction(index),
                    timestarted: "19:00",
                    timeEnd: "22:00",
                    booked: false
                })
            }
    })
})