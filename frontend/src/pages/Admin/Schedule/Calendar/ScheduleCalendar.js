import { BaseContainer, BaseTitle, Calendar, LoadSpinner, AppointmentCard } from "../../../../shared"
import { useContext, useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SideCalendar from "./SideCalendar"
import { formatJSONDate } from "../../../utils"
import { backend_url } from "../../../../constants"
import { UserContext } from "../../../../contexts"
import "./styles.css"
const moment = require("moment")


export default function ScheduleCalendar(){
    const {authFetch} = useContext(UserContext)
    const [date, setDate] = useState(null)
    const [options, setOptions] = useState([])
    const [dateOptions, setDateOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // fetch schedule
    const fetchSchedule = async () => {
        return await authFetch(`${backend_url}/schedule?status=appointed`, {
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

    // update value on appointment card collection change
    useEffect(() => {
        if(date){
            const _options = filterDates()
            setDateOptions(_options)
        }
    }, [options])

    // get appointments that share date of calendar date
    useEffect(() => {
        const _options = filterDates()
        setDateOptions(_options)
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

    // update values by refeching schedule
    const handleChange = () => {
        fetchSchedule()
    }

    // update values by refeching schedule
    const handleDelete = () => {
        fetchSchedule()
    }


    return (
        <Container style={{minHeight: "100vh", height: "fit-content"}} className="p-0" fluid>
            <Row
                xl={2} lg={2} sm={1} xs={1}
                className="m-0 p-0"
            >
                <Col
                    xl={4} lg={6} sm={12} xs={12}
                    className="m-0 p-0 admin-schedule-calendar-side"
                >
                    <SideCalendar onChange={setDate} format={formatCalendar}/>
                </Col>

                <Col
                    xl={8} lg={6} sm={12} xs={12}
                    className="m-0 p-0 admin-schedule-calendar-main"
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
                        {dateOptions.length > 0 ?
                            <Row
                                className=" m-0 my-3 px-3 justify-content-center"
                            >
                                {[...dateOptions].map(option => 
                                    <Col
                                        key={option.id}
                                        className="p-3 fade-in-card" 
                                        style={{minWidth: "320px", maxWidth: "350px"}}
                                    >
                                        <AppointmentCard
                                            appointment={option.appointment}
                                            onChange={() => handleChange()}
                                            onDelete={() => handleDelete()}
                                        />
                                    </Col>
                                )}
                            </Row>
                            :
                            <></>
                        }
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}