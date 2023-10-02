import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import { AppointmentCard, LoadSpinner } from "../../../shared"
import useApi from "../../../hooks/useApi"


export default function CurrentEventSection(){
    const [currentEvent, setCurrentEvent] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const {authFetch} = useApi()

    const fetchEvent = async () => {
        setIsLoading(true)

        await authFetch.get('appointment/closest').then(data => setCurrentEvent(data))

        setIsLoading(false)
    }

    useEffect(() => {
        fetchEvent()
    }, [])

    // if(isLoading){
    //     return <></>
    // }

    return (
        <Container className="p-0 d-flex flex-column justify-content-center align-items-center gap-3" fluid>
            <p className="m-0 p-0 fs-3 text-dark fw-bold text-center">
                Наступна консультація
            </p>

            <AppointmentCard 
                appointment={currentEvent}
            />
        </Container>
    )
}