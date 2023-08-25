import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SideFilters from "./SideFilters"
import { useState, useEffect, useContext } from "react"
import { backend_url } from "../../../../constants"
import { UserContext } from "../../../../contexts"
import { formatJSONDate } from "../../../utils"
import DateCard from "./DateCard"
import AppointmentContainer from "./AppointmentContainer"
import "./styles.css"
const moment = require("moment")


export default function Planning(){
    const {authFetch} = useContext(UserContext)
    const [date, setDate] = useState(null)
    const [options, setOptions] = useState([])
    const [dateSchedule, setDateSchedule] = useState(null)
    const [selectedAppointment, setSelectedAppointment] = useState(null)

    // fetch schedule
    const fetchSchedule = async () => {
        return await authFetch(`${backend_url}/schedule`, {
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("admin fetch schedule error")
        })
        .then(data => setOptions(data))
        .catch(error => console.error(error))
    }

    const fetchDateSchedule = async () => {
        if(!date){
            return
        }
        const _date = `${date?.year}-${(date?.month + 1).toString().padStart(2, '0')}-${date?.day}`

        return await authFetch(`${backend_url}/schedule/calendar?date=${_date}`, {
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Admin date schedule fetch error")
        })
        .then(data => setDateSchedule(data))
        .catch(error => console.log(error))
    }

    // filter full schedule and get appointments that share
    // the same date as calendar date
    const filterDates = () => {
        const _options = [...options].filter(freeDate => {
            const _date = moment(freeDate.date)
            return date.year == _date.year() && date.month == _date.month() 
                && date.day == _date.date()
        })

        return _options
    }

    // fetch schedule on page load
    useEffect(() => {
        fetchSchedule()
    }, [])

    // fetch day schedule on date change
    useEffect(() => {
        fetchDateSchedule()
        setSelectedAppointment(null)
    }, [date])

    // format calendar to show only days with appointed schedule dates
    const formatCalendar = ({year, month, day}) => {
        const dates = [...options].map(({date}) => date)
        const filteredDates = dates.filter(freeDate => {
            const date = moment(freeDate)
            return year == date.year() && month == date.month() && day == date.date()
        })

        return filteredDates.length > 0
    }

    const onChange = async () => {
        await fetchSchedule()
        await fetchDateSchedule()
    }

    return (
        <Container style={{minHeight: "100vh", height: "fit-content", backgroundColor: "var(--bs-gray-100)"}} className="p-0" fluid>
            <Row
                xl={2} lg={2} sm={1} xs={1}
                className="m-0 p-0"
            >
                <Col
                    xl={4} lg={6} sm={12} xs={12}
                    className="m-0 p-0 admin-planning-calendar-side"
                >
                    <SideFilters onChange={setDate} format={formatCalendar}/>
                </Col>

                <Col
                    xl={8} lg={6} sm={12} xs={12}
                    className="m-0 p-0 admin-planning-calendar-main"
                    style={{backgroundColor: "var(--bs-gray-100)"}}
                >
                    <Container className="p-0">
                        {date ? 
                            <p className="py-3 px-0 m-0 text-center text-muted fs-4 fw-semibold border-bottom border-muted">
                                {formatJSONDate(date)}
                            </p>
                            :
                            <></>
                        }
                        {dateSchedule ?
                            <Row xl={2} sm={1} xs={1} className="m-0 p-0">
                                <Col 
                                    xl={6} sm={12} xs={12} className="p-0 admin-planning-calendar-main-side"
                                >
                                    {Object.values(dateSchedule).map((_date, idx) =>
                                        <DateCard key={idx} date={_date} onChange={onChange} onSelect={setSelectedAppointment}/>
                                    )}
                                </Col>
                                <Col 
                                    xl={6} sm={12} xs={12} 
                                    className="p-0 py-5 admin-planning-calendar-main-appointment"
                                >
                                    <AppointmentContainer 
                                        appointment={selectedAppointment} 
                                        onChange={onChange}
                                        setAppointment={setSelectedAppointment}
                                    />
                                </Col>
                            </Row>
                            :
                            <h1></h1>
                        }
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}