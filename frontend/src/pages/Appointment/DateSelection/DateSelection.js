import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { backend_url } from "../../../constants"
import { useState, useEffect } from "react"
import DateOptionSelector from "./DateOptionSelector"
import { DateCalendar } from "../../../shared"
import { formatDate } from "../utils"
const moment = require('moment')


export default function DateSelection({setDate, nextSlide}){
    const [selectedDate, setSelectedDate] = useState({})
    const [options, setOptions] = useState([])
    const [selectedTime, setSelectedTime] = useState(null)
    const [freeDates, setFreeDates] = useState([])

    // fetch available dates for appointment
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

        // set seleceted time to null when date is changed
        setSelectedTime(null)
        setDate(null)

        setOptions(_options)
    }, [selectedDate])

    // format calendar. Unavailable dates will be unactive
    const formatCalendar = ({day, month, year}) => {
        const dates = [...freeDates].map(({date}) => date)
        const filteredDates = dates.filter(freeDate => {
            const date = moment(freeDate)
            return year == date.year() && month == date.month() && day == date.date()
        })

        return filteredDates.length == 0
    }

    const handleSubmit = () => {
        setDate(selectedTime)
        nextSlide()
    }

    return (
        <Container className="px-3 m-0 d-flex flex-column gap-3">
            <p className="p-0 m-0 text-muted text-center fs-6">
                Оберіть дату та час
            </p>

            <DateCalendar onChange={setSelectedDate} formatValues={formatCalendar}/>
            <DateOptionSelector options={options} setSelectedTime={setSelectedTime} />
            {selectedTime ?
                <>
                    <p className="m-0 p-0 text-center text-dark">
                        {formatDate(selectedTime.date)}
                    </p>
                    <Button 
                        style={{width: "fit-content"}} 
                        onClick={handleSubmit} className="mb-3 align-self-center calendar-button"
                        variant="outline-dark" size="md"
                    >
                        Продовжити
                    </Button>
                </>
                :
                <></>
            }
        </Container>
    )
}