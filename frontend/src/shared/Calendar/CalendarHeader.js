export default function CalendarHeader(){
    const daysOfTheWeek = ["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]

    return (
        <thead>
            <tr 
                style={{"--bs-border-opacity": "0.5"}} 
                className="border-bottom border-secondary fw-bold"
            >
                {daysOfTheWeek.map((day, idx) => 
                    <th key={idx}>{day}</th>
                )}
            </tr>
        </thead>
    )
}
