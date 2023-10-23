import Container from "react-bootstrap/Container"
import {DatePicker} from "../../../shared"
import Button from "react-bootstrap/Button"
import { backend_url } from "../../../constants"
import { useState, useEffect, Suspense } from "react"
import { LoadSpinner } from "../../../shared"
import { formatDate } from "../../utils"
const moment = require('moment')


export default function DatePicking({sumbitDate}){
    const [options, setOptions] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)

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
            setOptions(data)
        })
        .catch(error => console.log(error))
    }, [])

    // format calendar to show only days with free schedule dates
    const formatCalendar = ({year, month, day}) => {
        const dates = [...options].map(({date}) => date)
        const filteredDates = dates.filter(freeDate => {
            const date = moment(freeDate)
            return year == date.year() && month == date.month() && day == date.date()
        })

        return filteredDates.length > 0
    }

    return (
        <Suspense fallback={<LoadSpinner />}>
            <Container className="px-3 mt-3 d-flex flex-column gap-3">
                <p className="p-0 m-0 mb-3 text-muted text-center fs-6">
                    Оберіть дату та час
                </p>

                <DatePicker onChange={setSelectedDate} format={formatCalendar} options={options}/>

                {selectedDate ?
                    <>
                        <p className="m-0 p-0 text-center text-dark">
                            {formatDate(selectedDate.date)}
                        </p>
                        <Button 
                            style={{width: "fit-content"}} 
                            onClick={() => sumbitDate(selectedDate)} className="mb-3 align-self-center calendar-button"
                            variant="outline-dark" size="md"
                        >
                            Вибрати
                        </Button>
                    </>
                    :
                    <></>
                }
            </Container>
        </Suspense>
    )
}