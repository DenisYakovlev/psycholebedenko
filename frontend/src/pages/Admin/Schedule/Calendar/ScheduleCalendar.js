import { BaseContainer, BaseTitle, Calendar, LoadSpinner } from "../../../../shared"
import { useContext, useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import { backend_url } from "../../../../constants"
import { UserContext } from "../../../../contexts"
const moment = require("moment")


export default function ScheduleCalendar(){
    const {authFetch} = useContext(UserContext)
    const [date, setDate] = useState(null)
    const [options, setOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchSchedule = async () => {
            setIsLoading(true)

            await authFetch(`${backend_url}/schedule/`, {
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

        fetchSchedule()
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

    if(isLoading){
        return <LoadSpinner />
    }

    return (
        <BaseContainer light>
            <BaseTitle>
                Календар
            </BaseTitle>

            <Container 
                className="mt-3 p-0 d-flex flex-column justify-content-center align-items-center gap-3"
            >
                <Calendar onChange={setDate} format={formatCalendar}/>

            </Container>
        </BaseContainer>
    )
}