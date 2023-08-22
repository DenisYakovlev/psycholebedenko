import { BaseContainer, BaseTitle, Calendar } from "../../../../shared"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { backend_url } from "../../../../constants"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../../../contexts"
import { generateDates, generateFullDate } from "./utils"
const moment = require("moment")


export default function Planning(){
    const {authFetch} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState(null)
    const [options, setOptions] = useState([])
    const [dateOptions, setDateOptions] = useState([])


    const fetchSchedule = async () => {
        setIsLoading(true)

        await authFetch(`${backend_url}/schedule?status=free`, {
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

    const formatFreeDates = () => {
        const generatedDates = generateDates()
        const currentDay = moment().startOf('day')
        const formatedDateOptions = [...dateOptions].map(option => {
            return moment(option.date).format("HH:mm")
        })

        const freeDates = generatedDates.map(_date => {
            const isFree = !formatedDateOptions.includes(_date) && moment(date).isAfter(currentDay)

            return {
                date: _date,
                fullDate: generateFullDate(date, _date),
                isFree: isFree
            }
        })
        return freeDates
    }

    return(
        <BaseContainer light>
            <BaseTitle>
                Планування
            </BaseTitle>

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
                    {date ?
                        formatFreeDates().map(freeDate => 
                            <h1>{`${freeDate.date} : ${freeDate.isFree} : ${freeDate.fullDate}`}</h1>
                        )
                        :
                        <h1>Nothing</h1>
                    }
                </Col>
            </Row>
        </BaseContainer>
    )
}


// {dateOptions.length > 0 ? 
//     <Row 
//         style={{maxWidth: "100vw", minWidth: "350px", width: "100%", height: "fit-content"}} 
//         lg={2} sm={1} xs={1}
//         className="m-0 p-0 align-items-start justify-content-center"
//     >
        
//     </Row>
//     :
//     <h2 className="mt-5 p-0 text-center align-self-center">
//         Виберіть дати, на які можна буде записатися
//     </h2>
// }