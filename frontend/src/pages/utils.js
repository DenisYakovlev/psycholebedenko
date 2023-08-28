const moment = require("moment")

const monthsUkr = [
    "Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня",
    "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"
];

const daysUkr = [
    "Нед", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"
];

// {day: 30, month: 7, year: 2050} to "2050-08-30"
export const formatCalendarDate = date => {
    return moment(date).format("YYYY-MM-DD")
}

export const pretifyCalendarDate = date => {
    const _date = moment(date, 'YYYY-MM-DD');
    const translatedDay = daysUkr[_date.day()];
    const translatedMonth = monthsUkr[_date.month()];

    return `${translatedDay}, ${_date.date()} ${translatedMonth}`
}

// "2050-08-30" to {day: 30, month: 7, year: 2050}
export const reverseFormatCalendarDate = date => {
    const parsedDate = moment(date, 'YYYY-MM-DD');
    return {
        day: parsedDate.date(),
        month: parsedDate.month(),
        year: parsedDate.year()
    }
}

export const formatJSONDate = (date) => {
    const dayOfWeek = daysUkr[new Date(date.year, date.month, date.day).getDay()];
    const monthName = monthsUkr[date.month];

    return `${dayOfWeek}, ${date.day} ${monthName}`;
}

export const formatDate = (eventDate) => {
    const date = new Date(eventDate);
    const dayOfWeek = daysUkr[date.getDay()];
    const day = date.getDate();
    const month = monthsUkr[date.getMonth()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${dayOfWeek}, ${day} ${month} о ${hours}:${minutes}`;
    return formattedDate
}

export const formatUnixDate = (timestamp) => {
    // telegram timestamp is without timezone, so it's set here
    // timezone is Kiyv +03:00
    const date = new Date((timestamp + 3 * 3600) * 1000)

    const dayOfWeek = daysUkr[date.getUTCDay()]
    const dayOfMonth = date.getUTCDate()
    const month = monthsUkr[date.getUTCMonth()]
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')

    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} о ${hours}:${minutes}`
    return formattedDate
}

export const formatOnlyDate = (eventDate) => {
    const date = new Date(eventDate);
    const dayOfWeek = daysUkr[date.getDay()];
    const day = date.getDate();
    const month = monthsUkr[date.getMonth()];

    const formattedDate = `${dayOfWeek}, ${day} ${month}`;
    return formattedDate
}

export const formatTime = (eventDate) => {
    const date = new Date(eventDate);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${hours}:${minutes}`;
    return formattedDate
}

export const timeDiff = (givenDate) => {
    const now = new Date();
    givenDate = new Date(givenDate)
    const timeDifference = givenDate - now;
    
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return daysDifference > 0 ? `${daysDifference} дн.` : `${hoursDifference} год.`
}

export const setStatusColor = status => {
    if(status == "pending"){
        return "#FFD700"
    }
    else if(status == "appointed"){
        return "#32CD32"
    }
    else if(status == "complete"){
        return "#4169E1"
    }
    else if(status == "denied"){
        return "#FF6347"
    }
}

export const setStatusUkrName = status => {
    if(status == "pending"){
        return "в обробці"
    }
    else if(status == "appointed"){
        return "назначено"
    }
    else if(status == "complete"){
        return "виконано"
    }
    else if(status == "denied"){
        return "відмінено"
    }
}