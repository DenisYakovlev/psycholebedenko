import Container from "react-bootstrap/Container"
import SideFilters from "./SideFilters"
import { useState, useEffect, useContext, useRef } from "react"
import { backend_url } from "../../../../constants"
import { UserContext } from "../../../../contexts"
import { formatCalendarDate, pretifyCalendarDate } from "../../../utils"
import { BasePageLayout, BaseLayoutTitle, TwoSideLayout } from "../../Components"
import { useQueryParam, StringParam } from "use-query-params"
import LayoutMain from "./LayoutMain"
import DateCard from "./DateCard"
import AppointmentContainer from "./AppointmentContainer"
import AppointmentCreateCard from "./AppointmentCreateCard"
import "./styles.css"
import useApi from "../../../../hooks/useApi"
const moment = require("moment")


export default function Planning(){
    // const {authFetch} = useContext(UserContext)
    const {authFetch} = useApi()
    const [options, setOptions] = useState([])
    const [dateSchedule, setDateSchedule] = useState(null)
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [date, setDate] = useQueryParam("date", StringParam)
    const [time, setTime] = useQueryParam("time", StringParam)
    let selectedTimeCard = useRef(null)
    let dateIsFree = useRef(false)

    // fetch schedule
    const fetchSchedule = async () => {
        return await authFetch.get(`schedule`).then(data => setOptions(data))
    }

    // fetch schedule for specific date
    const fetchDateSchedule = async () => {
        if(!date){
            return
        }

        return await authFetch.get(`schedule/calendar?date=${date}`).then(data => setDateSchedule(data))
    }

    // if time is specified, than show related appointment for that date and time
    useEffect(() => {
        if(time && dateSchedule && !selectedAppointment){
            const target = document.getElementById(`admin-date-card-${time}`)
            handleDateSelect(target, dateSchedule[time])
        }
    }, [dateSchedule])

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

    // handle date card state change by refetching schedule
    const onChange = () => {
        fetchSchedule()
        fetchDateSchedule()
    }

    // on time select scroll to selected date card and mark it with right border
    const handleDateSelect = (target, date) => {
        if(selectedTimeCard.current){
            selectedTimeCard.current.style.setProperty("border-right", "none", "important")
        }

        selectedTimeCard.current = target
        selectedTimeCard.current.style.setProperty("border-right", "solid 5px #556080", "important")

        setTime(date.time)

        if(date.schedule){
            if(date.schedule?.appointment){
                setSelectedAppointment(date.schedule?.appointment)
                dateIsFree.current = false
            }
            else{
                setSelectedAppointment(null)
                dateIsFree.current = true
            }
        }
        else{
            dateIsFree.current = false
        }

        window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY})
    }

    // calendar sets date value like {date: 30, month: 6, year:2050}
    // to make it more approachable with query params, use formatCalendarDate
    // that formats json type date to "2050-06-30"
    const _setDate = calendarDate => {
        const _date = formatCalendarDate(calendarDate)
        dateIsFree.current = false
        setTime(null)
        setDate(_date)
    }

    return (
        <BasePageLayout>
            <TwoSideLayout>
                <TwoSideLayout.Side>
                    <SideFilters onChange={_setDate} format={formatCalendar}/>
                </TwoSideLayout.Side>
                
                <TwoSideLayout.Main>
                    <Container className="p-0">
                        
                        <BaseLayoutTitle>
                            {date ? pretifyCalendarDate(date): "Графік | Консультації"}
                        </BaseLayoutTitle>

                        {dateSchedule ?
                            <LayoutMain>
                                <LayoutMain.Schedule>
                                    {Object.values(dateSchedule).map((_date, idx) =>
                                        <DateCard 
                                            key={idx} 
                                            date={_date} 
                                            onChange={onChange} 
                                            onSelect={(event, date) => handleDateSelect(event.target, date)}
                                        />
                                    )}
                                </LayoutMain.Schedule>
                                <LayoutMain.Appointments>
                                    {selectedAppointment ?
                                        <AppointmentContainer 
                                            appointment={selectedAppointment} 
                                            onChange={onChange}
                                            setAppointment={setSelectedAppointment}
                                        />
                                        :
                                        dateIsFree.current ?
                                            <AppointmentCreateCard date={dateSchedule[time]}/>
                                            :
                                            <></>
                                    }
                                </LayoutMain.Appointments>
                            </LayoutMain>
                            :
                            <h1></h1>
                        }
                    </Container>
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}