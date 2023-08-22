// generate HH:MM format dates from 00:00 to 23:00 with + 1 hour step
export const generateDates = () => {
    const timeStrings = [];
  
    for (let hour = 0; hour <= 23; hour++) {
        const formattedHour = hour.toString().padStart(2, '0');
        timeStrings.push(`${formattedHour}:00`);
    }
    
    return timeStrings;
}

// from HH:mm format to YYYY-MM-DDTHH:mm:ss+TZ
export const generateFullDate = (date, hours) => {
    return `${date.year}-${(date.month + 1).toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}T${hours}:00+03:00`
}