import { BaseContainer, BaseTitle, Calendar, LoadSpinner, AppointmentCard } from "../../../../shared"
import { useContext, useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SideCalendar from "./SideCalendar"
import { formatCalendarDate, reverseFormatCalendarDate, pretifyCalendarDate } from "../../../utils"
import { backend_url } from "../../../../constants"
import { UserContext } from "../../../../contexts"
import { TwoSideLayout, BasePageLayout, BaseLayoutTitle } from "../../Components"
import { useQueryParam, StringParam} from 'use-query-params';
const moment = require("moment")


export default function ScheduleCalendar(){
    const {authFetch} = useContext(UserContext)
    const [date , setDate] = useQueryParam('date', StringParam)
    const [options, setOptions] = useState([])
    const [dateOptions, setDateOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // fetch schedule
    const fetchSchedule = async () => {
        return await authFetch(`${backend_url}/schedule/?status=appointed`, {
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
            const calendarDate = reverseFormatCalendarDate(date)
            return calendarDate.year == _date.year() && calendarDate.month == _date.month() 
                && calendarDate.day == _date.date()
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

    // update values by refeshing schedule
    const handleChange = () => {
        fetchSchedule()
    }

    // update values by refeshing schedule
    const handleDelete = () => {
        fetchSchedule()
    }

    // calendar sets date value like {date: 30, month: 6, year:2050}
    // to make it more approachable with query params, use formatCalendarDate
    // that formats json type date to "2050-06-30"
    const _setDate = calendarDate => {
        const _date = formatCalendarDate(calendarDate)
        setDate(_date)
    }

    return (
        <BasePageLayout>
            <TwoSideLayout>
                <TwoSideLayout.Side>
                    <SideCalendar onChange={_setDate} format={formatCalendar}/>
                </TwoSideLayout.Side>

                <TwoSideLayout.Main>
                    <Container className="p-0">

                        <BaseLayoutTitle>
                            {date ? pretifyCalendarDate(date) : "Консультації"}
                        </BaseLayoutTitle>

                        {dateOptions.length > 0 ?
                            <Row
                                className="m-0 my-3 px-3 justify-content-center"
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
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}