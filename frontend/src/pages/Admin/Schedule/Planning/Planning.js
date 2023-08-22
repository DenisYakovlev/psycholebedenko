import { BaseContainer, BaseTitle, Calendar, LoadSpinner } from "../../../../shared"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { backend_url } from "../../../../constants"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../../../contexts"
import DateCard from "./DateCard"
const moment = require("moment")


export default function Planning(){
    const {authFetch} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState(null)
    const [options, setOptions] = useState([])
    const [dateOptions, setDateOptions] = useState(null)


    const fetchSchedule = async () => {
        setIsLoading(true)

        await authFetch(`${backend_url}/schedule`, {
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
        const fetch = async () => {
            const _date = moment(date).format("YYYY-MM-DD")
            setIsLoading(true)

            authFetch(`${backend_url}/schedule/calendar?date=${_date}`,{
                method: "GET"
            })
            .then(response => {
                if(response.ok){
                    return response.json()
                }

                throw new Error("Schedule calendar fetch error")
            })
            .then(data => {
                setDateOptions(data)
            })
            .catch(error => console.log(error))
            setIsLoading(false)
        }

        if(!date){
            return 
        }

        fetch()
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


    return(
        <BaseContainer light>
            <BaseTitle>
                Планування
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
                        className="my-sm-5 my-3 px-5"
                    >
                        <Row
                            lg={2} sm={1} xs={1}
                            className="m-0 p-0 align-items-start justify-content-center"
                        >
                            {dateOptions ?
                                Object.values(dateOptions).map((value) => 
                                    <Col lg={6} sm={12} xs={12} className="m-0 p-3">
                                        <DateCard date={value}/>
                                    </Col>
                                )
                                :
                                <h1>Виберіть дати, на які можна буде записатися</h1>
                            }
                        </Row>
                    </Col>
                </Row>
            }
        </BaseContainer>
    )
}

