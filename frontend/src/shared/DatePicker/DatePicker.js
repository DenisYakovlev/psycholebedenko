import Container from "react-bootstrap/Container"
import Calendar from "../Calendar/Calendar"
import TimeOptionPicker from "../TimeOptionPicker/TimeOptionPicker"
import { useEffect, useState } from "react"
const moment = require("moment")


export default function DatePicker({
    onChange,
    format,
    options = []
}){
    const [calendarDate, setCalendarDate] = useState(null)
    const [optionsTime, setOptionsTime] = useState(null)
    const [freeOptions, setFreeOptions] = useState([])

    // set options free dates on calendar date change
    useEffect(() => {
        const _options = [...options].filter(freeDate => {
            const date = moment(freeDate.date)
            return calendarDate.year == date.year() && calendarDate.month == date.month() 
                && calendarDate.day == date.date()
        })

        // set seleceted time to null when date is changed
        setOptionsTime(null)
        onChange(null)

        setFreeOptions(_options)
    }, [calendarDate])

    return (
        <Container className="m-0 p-0" fluid>
            <Calendar onChange={setCalendarDate} format={format}/>
            <TimeOptionPicker onChange={onChange} options={freeOptions}/>
        </Container>
    )
}
