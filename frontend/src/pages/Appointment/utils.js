export const formatDate = (eventDate) => {
    const monthsUkr = [
        "Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня",
        "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"
    ];
    
    const daysUkr = [
        "Нед", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"
    ];

    const date = new Date(eventDate);
    const dayOfWeek = daysUkr[date.getDay()];
    const day = date.getDate();
    const month = monthsUkr[date.getMonth()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${dayOfWeek}, ${day} ${month} о ${hours}:${minutes}`;
    return formattedDate
}
