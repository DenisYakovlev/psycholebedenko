import Container from "react-bootstrap/Container"
import { backend_url } from "../../../constants"
import { useState, useEffect } from "react"
import DateCalendar from "./DateCalendar"
import DateOptionSelector from "./DateOptionSelector"
const moment = require('moment')


export default function DateSelection({setDate, nextSlide}){
    const [selectedDate, setSelectedDate] = useState({})
    const [options, setOptions] = useState([])
    const [freeDates, setFreeDates] = useState([])

    useEffect(() => {
        fetch(`${backend_url}/schedule?status=free`, {
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }
            
            throw new Error("schedule request error")
        })
        .then(data => {
            setFreeDates(data)
        })
        .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        const _options = [...freeDates].filter(freeDate => {
            const date = moment(freeDate.date)
            return selectedDate.year == date.year() && selectedDate.month == date.month() && selectedDate.day == date.date()
        })

        setOptions(_options)
    }, [selectedDate])


    const dateIsEmpty = ({day, month, year}) => {
        const dates = [...freeDates].map(({date}) => date)
        const filteredDates = dates.filter(freeDate => {
            const date = moment(freeDate)
            return year == date.year() && month == date.month() && day == date.date()
        })

        return filteredDates.length == 0
    }

    return (
        <Container className="px-3 m-0 d-flex flex-column gap-3">
            <p className="p-0 m-0 text-muted text-center fs-6">
                Оберіть дату
            </p>

            <DateCalendar dateIsEmpty={dateIsEmpty} setSelectedDate={setSelectedDate}/>
            <DateOptionSelector options={options} setDate={setDate} nextSlide={nextSlide}/>
        </Container>
    )
}