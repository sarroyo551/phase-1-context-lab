/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 let createEmployeeRecord = function(row){
    const obj =  {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}

/*let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}*/

function createEmployeeRecords(arrOfArr) {
    const result = arrOfArr.map(createEmployeeRecord)
    //console.log('result', result)
    return result
}

//console.log('test',  createEmployeeRecords(arrOfArr));

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

function hoursWorkedOnDate(dateOfForm) {
    let timeIn = this.timeInEvents.find(timeInEvent => timeInEvent.date === dateOfForm)
    let timeOut = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date === dateOfForm)
    /*console.log(timeIn)
    console.log(timeOut)*/
    return (timeOut.hour - timeIn.hour)/100

}

function wagesEarnedOnDate(dateOfForm) {
   // return hoursWorkedOnDate(dateOfForm) * this.payPerHour
   const hours = hoursWorkedOnDate.call(this, dateOfForm)
   return hours * this.payPerHour
}
    


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    
    return payable
}

/*const allWagesFor = function (employee) {
    const eligibleDates = employee.timeInEvents.map((e) => e.date)
    const payable = eligibleDates.reduce((memo, d) => memo + wagesEarnedOnDate(employee, d),0)
    return payable
}*/


function findEmployeeByFirstName (employeeArr, fName) {
    const found = employeeArr.find(emp => emp.firstName === fName)
    return found 

}

function calculatePayroll(employeeRecordArr) {
    return employeeRecordArr.map(employee => allWagesFor.call(employee)).reduce((currentValue, total) => currentValue + total)
}



/*function calculatePayroll(employeeRecordArr) {
    const wagesEarned = employeeRecordArr.map(allWagesFor)
    return wagesEarned.reduce((accumulator, entry) => accumulator + entry, 0)
}*/
