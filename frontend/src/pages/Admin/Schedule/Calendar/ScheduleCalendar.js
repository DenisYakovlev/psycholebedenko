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
                <Row
                    lg={2} sm={1} xs={1}
                    className="my-5 p-0 w-100 align-items-start justify-content-center"
                >
                    <Col 
                        lg={6} sm={12} xs={12}
                        style={{maxWidth: "400px"}} 
                        className="mb-5 mt-lg-5 mt-0 p-0 d-flex justify-content-center"
                    >
                        <Calendar onChange={setDate} format={formatCalendar}/>
                    </Col>

                    <Col
                        lg={8} sm={12} xs={12}
                        className="m-0 p-0"
                    >
                        {dateOptions.length > 0 ? 
                            <Row 
                                style={{maxWidth: "100vw", minWidth: "350px", width: "100%", height: "fit-content"}} 
                                lg={2} sm={1} xs={1}
                                className="m-0 p-0 align-items-start justify-content-center"
                            >
                                {[...dateOptions].map(_option => 
                                    <Col 
                                        style={{width: "300px"}}
                                        key={_option.id} lg={6} sm={12} xs={12} 
                                        className="m-3 p-0 fade-in-card"
                                    >
                                        <AppointmentCard
                                            appointment={_option.appointment}
                                            onChange={option => handleChange(option)}
                                            onDelete={option => handleDelete(option)}
                                        />
                                    </Col>
                                )}
                            </Row>
                            :
                            <h2 className="mt-5 p-0 text-center align-self-center">
                                Показуються майбутні записи
                            </h2>
                        }
                    </Col>
                </Row>
            }
            
        </BaseContainer>
    )
}