import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"
import { useState } from "react"
import MonthCarousel from "./MonthCarousel"
import "./styles.css"
const moment = require('moment')


export default function DateCalendar({formatValues, onChange}){
    const [currMonth, setCurrMonth] = useState(() => new Date().getMonth())
    const [currYear, setCurrYear] = useState(() => new Date().getFullYear())

    const daysOfTheWeek = ["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]

    // get day of the week of first day in month
    // example: if first day of month is thursday than it's 4
    // if first day of month is sunday than it's 0
    const getCalendarFirstDay = () => new Date(currYear, currMonth, 1).getDay()

    // get how many days in selected month
    const getDaysInMonth = month => {
        if(month == -1){
            month = 0
        }
        return moment({currYear, month}).daysInMonth()
    }

    // count how many rows will be in calendar based on weeks
    // also count unrelated months
    const countWeeks = () => {
        const startDay = getCalendarFirstDay()
        const daysInMonth = getDaysInMonth(currMonth)
        return Math.ceil((startDay + daysInMonth) / 7)
    } 

    // get date of index in calendar grid
    // example: index = 5
    // if startDay is thursday, than it's value is 4
    // and day of the week of index value will be Friday.
    // That means that index value is 2nd date of current month
    // So, date is 2
    const evaluateDateInCalendar = index => {
        const startDay = getCalendarFirstDay()
        const daysInMonth = getDaysInMonth(currMonth)

        // evaluate day by index in grid
        const day = index - startDay + 1

        // evaluate dates of past month
        if(day <= 0){
            const daysInPastMonth = getDaysInMonth(currMonth - 1)
            return {
                day: daysInPastMonth + day,
                month: currMonth - 1 < 0 ? 11 : currMonth - 1,
                year: currMonth - 1 < 0 ? currYear - 1 : currYear
            }
        }
        // evaluate dates of next month
        else if(day > daysInMonth){
            return {
                day: day - daysInMonth,
                month: currMonth + 1 > 11 ? 0 : currMonth + 1,
                year: currMonth + 1 > 11 ? currYear + 1 : currYear
            }
        }
        // in other cases, date is in bounds of current month
        else{
            return {
                day: day,
                month: currMonth,
                year: currYear
            }
        }
    }

    // const handleClick = (date) => {
    //     onChange(date)
    // }

    return (
        <Container className="px-3 m-0 d-flex flex-column gap-3">
            
            <MonthCarousel currYear={currYear} setCurrYear={setCurrYear} currMonth={currMonth} setCurrMonth={setCurrMonth}/>

            <Table className="text-center fs-6 shadow-sm" bordered={false}>
                <thead>
                    <tr style={{"--bs-border-opacity": "0.5"}} className="border-bottom border-secondary fw-bold">
                        {daysOfTheWeek.map((day, idx) => 
                            <th key={idx}>{day}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(countWeeks())].map((x, week) => {
                        // indexes for current week
                        const indexes = [...Array(7)].map((y, index) => week*7 + index)

                        return (
                            <tr key={week}>
                                {indexes.map(index => {
                                    const {day, month, year} = evaluateDateInCalendar(index)
                                    const isEmpty = formatValues({day, month, year})

                                    return (
                                        <th 
                                            onClick={e => onChange({day, month, year})} key={index}
                                            style={{
                                                color: isEmpty ? "var(--bs-gray-500)" : "var(--bs-dark)",
                                                cursor: isEmpty ? "default" : "pointer"
                                            }}
                                            className="calendar-date"
                                        >
                                            {day}
                                        </th>
                                    )
                            })}
                            </tr> 
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}