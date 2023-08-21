import { BaseContainer, BaseTitle, Calendar, LoadSpinner, AppointmentCard } from "../../../../shared"
import { useContext, useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { backend_url } from "../../../../constants"
import { UserContext } from "../../../../contexts"
const moment = require("moment")


export default function ScheduleCalendar(){
    const {authFetch} = useContext(UserContext)
    const [date, setDate] = useState(null)
    const [options, setOptions] = useState([])
    const [dateOptions, setDateOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchSchedule = async () => {
        setIsLoading(true)

        await authFetch(`${backend_url}/schedule?status=appointed`, {
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

        setIsLoading(false)
    }

    useEffect(() => {
        fetchSchedule()
    }, [])

    useEffect(() => {
        const _options = [...options].filter(freeDate => {
            const _date = moment(freeDate.date)
            return date.year == _date.year() && date.month == _date.month() 
                && date.day == _date.date()
        })

        setDateOptions(_options)
    }, [date])

    // format calendar to show only days with free schedule dates
    const formatCalendar = ({year, month, day}) => {
        const dates = [...options].map(({date}) => date)
        const filteredDates = dates.filter(freeDate => {
            const date = moment(freeDate)
            return year == date.year() && month == date.month() && day == date.date()
        })

        return filteredDates.length > 0
    }

    const handleChange = appointemnt => {
        const _appointments = [...options].map(_appointemnt => {
            if(_appointemnt.id == appointemnt.id){
                return appointemnt
            }
            return _appointemnt
        })

        setDateOptions([])
        fetchSchedule()
    }

    const handleDelete = appointemnt => {
        let _appointments = [...options]
        _appointments.splice(_appointments.findIndex(a => a.id == appointemnt.id), 1)

        setDateOptions([])
        fetchSchedule()
    }


    return (
        <BaseContainer light>
            <BaseTitle>
                Календар
            </BaseTitle>

            {isLoading ?
                <LoadSpinner />
                :
                <Container 
                    className="mt-3 p-0 d-flex flex-column justify-content-center align-items-center gap-5"
                >
                    <Calendar onChange={setDate} format={formatCalendar}/>

                    {dateOptions.length > 0 ? 
                        <Row 
                            style={{maxWidth: "100vw", minWidth: "350px", width: "100%", height: "fit-content"}} 
                            lg={3} md={2} sm={1} xs={1}
                            className="my-md-5 my-3 px-md-5 px-3 align-items-start justify-content-center"
                        >
                            {[...dateOptions].map(_option => 
                                <Col key={_option.id} lg={4} md={6} sm={12} className="m-0 p-3 fade-in-card">
                                    <AppointmentCard
                                        appointment={_option.appointment}
                                        onChange={option => handleChange(option)}
                                        onDelete={option => handleDelete(option)}
                                    />
                                </Col>
                            )}
                        </Row>
                        :
                        <h2 className="m-0 p-0 text-center">
                            Показуються майбутні записи
                        </h2>
                    }
                </Container>
            }
            
        </BaseContainer>
    )
}