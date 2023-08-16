const moment = require('moment')

const getCalendarFirstDay = (year, month) => new Date(year, month, 1).getDay()

// get how many days in selected month
const getDaysInMonth = (year, month) => {
    if(month == -1){
        month = 0
    }
    return moment({year, month}).daysInMonth()
}

// count how many rows will be in calendar based on weeks
// also count unrelated months
const countWeeks = (year, month) => {
    const startDay = getCalendarFirstDay(year, month)
    const daysInMonth = getDaysInMonth(year, month)
    return Math.ceil((startDay + daysInMonth) / 7)
}

const evaluateDateInCalendar = (year, month, index) => {
    const startDay = getCalendarFirstDay(year, month)
    const daysInMonth = getDaysInMonth(year, month)

    // evaluate day by index in grid
    const day = index - startDay + 1

    // evaluate dates of past month
    if(day <= 0){
        const daysInPastMonth = getDaysInMonth(year, month - 1)
        return {
            day: daysInPastMonth + day,
            month: month - 1 < 0 ? 11 : month - 1,
            year: month - 1 < 0 ? year - 1 : year
        }
    }
    // evaluate dates of next month
    else if(day > daysInMonth){
        return {
            day: day - daysInMonth,
            month: month + 1 > 11 ? 0 : month + 1,
            year: month + 1 > 11 ? year + 1 : year
        }
    }
    // in other cases, date is in bounds of current month
    else{
        return {
            day: day,
            month: month,
            year: year
        }
    }
}

export {getCalendarFirstDay, getDaysInMonth, countWeeks, evaluateDateInCalendar}