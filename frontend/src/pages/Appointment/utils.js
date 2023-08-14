const monthsUkr = [
    "Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня",
    "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"
];

const daysUkr = [
    "Нед", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"
];


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