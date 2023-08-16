import {useRef} from "react"
import { evaluateDateInCalendar, countWeeks } from "./utils"


export default function CalendarBody({
    format,
    onChange,
    currMonth,
    currYear
}){
    let selectedDate = useRef(null)

    // set color of active cell and set value
    const _onChange = (e, date) => {
        if(selectedDate.current){
            selectedDate.current.style.setProperty("background-color", "var(--bs-table-bg)")
        }

        selectedDate.current = e.target
        selectedDate.current.style.setProperty("background-color", "var(--bs-gray-300)")

        onChange(date)
    }

    return (
        <tbody>
            {[...Array(countWeeks(currYear, currMonth))].map((x, week) => {
                // indexes for current week
                const indexes = [...Array(7)].map((y, index) => week*7 + index)

                return (
                    <tr key={week}>
                        {indexes.map(index => {
                            // evaluating date and setting it's format
                            const date = evaluateDateInCalendar(currYear, currMonth, index)
                            const active = format(date)

                            return (
                                // cell of calendar
                                <th 
                                    onClick={e => _onChange(e, date)}
                                    key={index} className="calendar-date"
                                    style={{
                                        color: !active ? "var(--bs-gray-400)" : "var(--bs-dark)",
                                        cursor: !active ? "default" : "pointer"
                                    }}
                                >
                                    {date.day}
                                </th>
                            )
                    })}
                    </tr> 
                )
            })}
        </tbody>
    )
}
